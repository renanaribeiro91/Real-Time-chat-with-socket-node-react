import 'dotenv/config';
import express from 'express';
import { router } from './api/modules/users/routes/router';
import config from './api/config/env/local';
import { MongoDBService } from './api/database/database';
import cors from 'cors';
import { createServer } from 'http';
import configureSocket from './api/socket/configureSocket';

MongoDBService()
  .then(() => {
    const app = express();

    const server = createServer(app);
    configureSocket(server);

    app.use(express.json());
    app.use(cors());

    const BASE_ROUTE = config.app.baseRoute;
    app.use(BASE_ROUTE, router);

    const { port } = config.app;
    server.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to the database', err);
  });
