provider "aws" {
  region  = "ap-southeast-2"
  profile = "paw"
}

variable "module_name" {
  default = "ray-dynamodb"
}

locals {
  tags = {
    name = var.module_name
  }
}
