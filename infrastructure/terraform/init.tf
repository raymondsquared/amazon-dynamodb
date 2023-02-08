provider "aws" {
  region  = "ap-southeast-2"
  profile = "paw"
}

variable "table_name" {
  default = "ray-music"
}

locals {
  tags = {
    name = var.table_name
  }
}
