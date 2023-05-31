import 'dotenv/config'

const config = {
  app: {
    name: 'Formaretech',
    baseRoute: '/api/users',
    port: process.env.PORT
  },
  db: {
    mongodb: {
      application: {
        url: process.env.DB_MONGODB_HOST,
        options: {
          minPoolSize: 5,
          maxPoolSize: 10
        },
      }
    },
  },
};

export default config;
