variable "region" {
  description = "Região AWS"
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "Nome do cluster EKS"
  type        = string
  default     = "demo-cluster"
}

variable "kubernetes_version" {
  description = "Versão do Kubernetes"
  type        = string
  default     = "1.29"
}

variable "desired_size" {
  description = "Capacidade desejada de nodes"
  type        = number
  default     = 1
}

variable "max_size" {
  description = "Capacidade máxima de nodes"
  type        = number
  default     = 2
}

variable "min_size" {
  description = "Capacidade mínima de nodes"
  type        = number
  default     = 1
}