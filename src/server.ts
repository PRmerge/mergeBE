import App from './app';

const http = new App().app;
const port = process.env.PORT;

http.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
