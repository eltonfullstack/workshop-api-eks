terraform {
  backend "s3" {
    bucket = "oficina-api-eks-cluster"
    key    = "terraform.tfstate"
    region = "us-east-1"
    // dynamodb_table = "terraform-lock-table"    # (Opcional) tabela DynamoDB para lock
  }
}


provider "aws" {
  default_tags {
    tags = {
      eks = "fullstack"
    }
  }
}
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.17.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.12"
    }
  }
}


