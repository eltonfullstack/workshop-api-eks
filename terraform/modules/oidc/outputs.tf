output "role_arn" {
  description = "ARN da IAM Role que o GitHub Actions pode assumir"
  value       = aws_iam_role.this.arn
}

output "role_name" {
  description = "Nome da IAM Role"
  value       = aws_iam_role.this.name
}

output "oidc_provider_arn" {
  description = "ARN do OIDC Provider do GitHub"
  value       = aws_iam_openid_connect_provider.github.arn
}

output "oidc_provider_url" {
  description = "URL do OIDC Provider do GitHub"
  value       = aws_iam_openid_connect_provider.github.url
}

output "github_subjects" {
  description = "Subjects configurados para a role (quem pode assumir)"
  value       = var.github_subjects
}
