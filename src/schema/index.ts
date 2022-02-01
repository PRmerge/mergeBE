import { connect } from 'mongoose';

export const connectMongoDB = async () => {
  await connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/merge`)
    .catch((err) => {
      console.error(err);
    });
};
