import { dynamoDBClient, describeTable, putItem, getItem } from './dynamodb.';
import { Music } from './music';

const run = async () => {
  try {
    const describeOutput = await describeTable();
    console.log('Success, event sent; requestID:', describeOutput);
    return;
  } catch (err) {
    console.log('Error', err);
  }
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

const get = async () => {
  try {
    const getOutput = await getItem('Acme Band', 'Happy Day');
    console.log({ getOutput });
    return;
  } catch (err) {
    console.log('Error', err);
  }
};

// run();
// init();
get();
