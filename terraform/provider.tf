terraform {
  backend "s3" {
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


