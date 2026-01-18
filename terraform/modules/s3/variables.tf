variable "bucket_name" {
  description = "Nome do bucket S3 do Terraform"
  type        = string
}

variable "dynamodb_table_name" {
  description = "Nome da tabela DynamoDB para lock (opcional)"
  type        = string
  default     = ""
}

variable "role_name" {
  description = "Nome da role IAM para anexar as policies"
  type        = string
}

variable "region" {
  description = "Região AWS"
  type        = string
}

