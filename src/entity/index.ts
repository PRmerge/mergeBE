import { createConnection } from 'typeorm';

export const connectDB = async (): Promise<void> => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      'dist/entity/*.js'
    ],
    synchronize: true,
    logger: 'file',
    logging: true
  }).catch((err): void => {
    console.error(err);
  });
};