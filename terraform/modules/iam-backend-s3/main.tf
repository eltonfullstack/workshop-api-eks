resource "aws_iam_policy" "terraform_backend_s3" {
  name        = "TerraformBackendS3Access"
  description = "Permissões para o Terraform usar o backend S3"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "ListBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = "arn:aws:s3:::${var.bucket_name}"
      },
      {
        Sid    = "StateObjects"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "arn:aws:s3:::${var.bucket_name}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_backend_s3" {
  role       = var.role_name
  policy_arn = aws_iam_policy.terraform_backend_s3.arn
}
