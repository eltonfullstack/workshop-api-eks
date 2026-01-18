variable "role_name" {
  description = "Nome da IAM Role assumida pelo GitHub Actions"
  type        = string
}

variable "policy_arns" {
  description = "Lista de ARNs de policies a serem anexadas à role"
  type        = list(string)
}

variable "github_subjects" {
  description = <<EOT
Lista de subjects permitidos no OIDC.
Exemplo:
repo:org/repo:ref:refs/heads/main
repo:org/repo:pull_request
EOT
  type = list(string)
}
