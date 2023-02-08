import {
  DynamoDBClient, DynamoDBClientConfig,
  DescribeTableCommand, DescribeTableCommandInput,
  PutItemCommand, PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';

// a client can be shared by different commands.
const config: DynamoDBClientConfig = {
  region: 'ap-southeast-2',
};
const dynamoDBClient = new DynamoDBClient(config);

const run = async () => {
  try {
    const params: DescribeTableCommandInput = {
      TableName: 'ray-music',
    };

    const data = await dynamoDBClient.send(new DescribeTableCommand(params));
    console.log('Success, event sent; requestID:', data);
    // return data;
  } catch (err) {
    console.log('Error', err);
  }
};

interface Music {
  artist: string;
  songTitle: string;
  albumTitle: string;
  awards: number;
}

const putItem = async (music: Music) => {
  await dynamoDBClient.send(
    new PutItemCommand(
      {
        TableName: 'ray-music',
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

const init = async () => {
  try {
    await putItem({
      artist: 'No One You Know', songTitle: 'Call Me Today', albumTitle: 'Somewhat Famous', awards: 1,
    } as Music);
    await putItem({
      artist: 'No One You Know', songTitle: 'Howdy', albumTitle: 'Somewhat Famous', awards: 2,
    } as Music);
    await putItem({
      artist: 'Acme Band', songTitle: 'Happy Day', albumTitle: 'Songs About Life', awards: 10,
    } as Music);
    await putItem({
      artist: 'Acme Band', songTitle: 'PartiQL Rocks', albumTitle: 'Another Album Title', awards: 8,
    } as Music);

    return;
  } catch (err) {
    console.log('Error', err);
  }
};

run();
init();
