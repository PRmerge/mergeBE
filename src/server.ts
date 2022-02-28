import App from './app';

const http = new App().app;
const port: string = process.env.PORT;

http.listen(port, (): void => {
  console.log(`http://localhost:${port}`);
});

console.log('간단한 테스트입니다.');