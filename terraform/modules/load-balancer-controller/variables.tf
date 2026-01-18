variable "project_name" {
  type        = string
  description = "Project Name"
}

variable "tags" {
  type        = map(any)
  description = "Tags to be added to AWS resources"
}

variable "oidc" {
  type        = string
  description = "HTTPS URL from OIDC provider of de EKS Cluster"
}

variable "cluster_name" {
  type        = string
  description = "EKS cluster name"
}