import mongoose from "mongoose";
import config from '../config/env/local';

export const MongoDBService = async () => {
  const connectionString = String(config.db.mongodb.application.url);

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    family: 4,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  };

  await mongoose.connect(connectionString, options);
};
