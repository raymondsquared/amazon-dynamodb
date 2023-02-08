import {
  DynamoDBClient, DynamoDBClientConfig, DescribeTableCommand, DescribeTableCommandInput,
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

// Uncomment this line to run execution within this file.
run();
