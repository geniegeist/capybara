import createServer from './lib/createServer';

const app = createServer();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
