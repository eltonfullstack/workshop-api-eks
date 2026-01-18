module "network" {
  source = "./modules/network"

  cluster_name = var.cluster_name
  region       = var.region
}

module "master" {
  source = "./modules/cluster"

  cluster_name       = var.cluster_name
  kubernetes_version = var.kubernetes_version

  private_subnet_1a = module.network.private_subnet_1a
  private_subnet_1b = module.network.private_subnet_1b
}

module "node" {
  source = "./modules/node"

  cluster_name = module.master.cluster_name

  private_subnet_1a = module.network.private_subnet_1a
  private_subnet_1b = module.network.private_subnet_1b

  desired_size = var.desired_size
  min_size     = var.min_size
  max_size     = var.max_size
}

module "oidc" {
  source    = "./modules/oidc"
  role_name = "github-actions-deploy"

  policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy",
    "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
  ]

  github_subjects = [
    "repo:eltonfullstack/workshop-api-eks:*"
  ]
}

module "terraform_backend_s3" {
  source      = "./modules/iam-backend-s3"
  role_name  = "github-actions-deploy"
  bucket_name = "workshop-api-eks"
}
