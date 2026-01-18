output "bucket_name" {
  value = aws_s3_bucket.terraform_state.bucket
}

output "s3_policy_arn" {
  value = aws_iam_policy.terraform_state_s3.arn
}

output "dynamodb_policy_arn" {
  value = var.dynamodb_table_name != "" ? aws_iam_policy.terraform_lock_dynamodb[0].arn : ""
}
