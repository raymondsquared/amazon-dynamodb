resource "aws_dynamodb_table" "music_table" {
  name           = var.table_name
  read_capacity  = 3
  write_capacity = 3
  hash_key       = "artist"
  range_key      = "songTitle"

  attribute {
    name = "artist"
    type = "S"
  }

  attribute {
    name = "songTitle"
    type = "S"
  }

  tags = local.tags
}
