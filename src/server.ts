import createServer from './server/createServer';

const app = createServer();

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
