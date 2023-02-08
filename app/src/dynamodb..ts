import {
  DynamoDBClient, DynamoDBClientConfig,
  DescribeTableCommand, DescribeTableCommandInput,
  PutItemCommand, PutItemCommandInput, GetItemCommand, GetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { Music } from './music';

// a client can be shared by different commands.
const config: DynamoDBClientConfig = {
  region: 'ap-southeast-2',
};

const tableName = 'ray-music';

const dynamoDBClient = new DynamoDBClient(config);

const describeTable = async () => {
  const params: DescribeTableCommandInput = {
    TableName: tableName,
  };

  return dynamoDBClient.send(new DescribeTableCommand(params));
};

const putItem = async (music: Music) => {
  await dynamoDBClient.send(
    new PutItemCommand(
      {
        TableName: tableName,
        Item: {
          artist: { S: music.artist },
          songTitle: { S: music.songTitle },
          albumTitle: { S: music.albumTitle },
          awards: { N: music.awards.toString() },
        },
      } as PutItemCommandInput,
    ),
  );
};

const getItem = async (artist: string, songTitle: string, consistentRead = true) => {
  await dynamoDBClient.send(
    new GetItemCommand({
      TableName: tableName,
      Key: {
        artist: { S: artist },
        songTitle: { S: songTitle },
      },
      ConsistentRead: consistentRead,
    } as GetItemCommandInput),
  );
};

export {
  config,
  dynamoDBClient,
  describeTable,
  putItem,
  getItem,
};
