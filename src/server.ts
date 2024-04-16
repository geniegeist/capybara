import createServer from './server/createServer';

const port = process.env.PORT || 4000;

const app = createServer();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
