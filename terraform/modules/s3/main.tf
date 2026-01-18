# Bucket do Terraform
resource "aws_s3_bucket" "terraform_state" {
  bucket = var.bucket_name

  /* versioning {
    enabled = true
  } */

  tags = {
    Name = var.bucket_name
  }
}

# Policy S3 para backend
resource "aws_iam_policy" "terraform_state_s3" {
  name        = "${var.bucket_name}-s3-access"
  description = "Permite acesso ao bucket S3 do state do Terraform"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "TerraformStateBucket"
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.terraform_state.arn
      },
      {
        Sid    = "TerraformStateObjects"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.terraform_state.arn}/*"
      }
    ]
  })
}

# Policy DynamoDB para lock (se informado)
resource "aws_iam_policy" "terraform_lock_dynamodb" {
  count       = var.dynamodb_table_name != "" ? 1 : 0
  name        = "${var.dynamodb_table_name}-lock-access"
  description = "Permite lock do Terraform no DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "TerraformLockTable"
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:DescribeTable"
        ]
        Resource = "arn:aws:dynamodb:${var.region}:${data.aws_caller_identity.current.account_id}:table/${var.dynamodb_table_name}"
      }
    ]
  })
}

# Attach policy S3 à role
resource "aws_iam_role_policy_attachment" "attach_terraform_state_s3" {
  role       = var.role_name
  policy_arn = aws_iam_policy.terraform_state_s3.arn
}

# Attach policy DynamoDB à role
resource "aws_iam_role_policy_attachment" "attach_terraform_lock_dynamodb" {
  count      = var.dynamodb_table_name != "" ? 1 : 0
  role       = var.role_name
  policy_arn = aws_iam_policy.terraform_lock_dynamodb[0].arn
}

data "aws_caller_identity" "current" {}
