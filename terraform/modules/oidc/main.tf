data "aws_caller_identity" "current" {}

# Provider OIDC do GitHub
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

# Assume Role Policy
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = var.github_subjects
    }
  }
}

# Role OIDC
resource "aws_iam_role" "this" {
  name               = var.role_name
  assume_role_policy = data.aws_iam_policy_document.assume_role.json

  lifecycle {
    create_before_destroy = true
  }
}

# Attach policies padrão (EKS + ECR)
resource "aws_iam_role_policy_attachment" "this" {
  for_each = toset(var.policy_arns)

  role       = aws_iam_role.this.name
  policy_arn = each.value
}

# Policy read-only para Plan
# Policy read-only para Plan (ajustada)
resource "aws_iam_policy" "readonly_for_github" {
  name        = "GitHubActionsReadOnly"
  description = "Permissões necessárias para terraform plan"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          # IAM
          "iam:Get*",
          "iam:List*",

          # EC2 / VPC
          "ec2:Describe*",

          # EKS
          "eks:Describe*",
          "eks:List*",

          # ELB / ALB
          "elasticloadbalancing:Describe*",

          # AutoScaling
          "autoscaling:Describe*",

          # CloudWatch
          "cloudwatch:Get*",
          "cloudwatch:List*",
          "cloudwatch:Describe*",

          # S3 (backend)
          "s3:GetObject",
          "s3:ListBucket",

          # KMS (se backend usa SSE-KMS)
          "kms:DescribeKey",
          "kms:GetKeyPolicy",
          "kms:GetKeyRotationStatus",

          # STS
          "sts:GetCallerIdentity"
        ],
        Resource = "*"
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "readonly_attach" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.readonly_for_github.arn
}

# Policy full para Apply
resource "aws_iam_policy" "full_for_github" {
  name        = "GitHubActionsTerraformFullAccess"
  description = "Permissões completas para Terraform Apply"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = ["*"],
        Resource = ["*"]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "full_attach" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.full_for_github.arn
}
