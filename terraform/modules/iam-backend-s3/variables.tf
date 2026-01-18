variable "role_name" {
  type        = string
  description = "Nome da role do GitHub Actions"
}

variable "bucket_name" {
  type        = string
  description = "Bucket S3 usado como backend do Terraform"
}
