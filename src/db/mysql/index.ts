import { createConnection } from 'typeorm';

export const connectMysql = async () => {
  await createConnection({
    type: 'mysql',
    port: Number(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
    entities: [
      'dist/entities/*.js'
    ],
    synchronize: true,
    logging: true,
    logger: 'file'
  });
};