'use strict';

import app from './app';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
dotenv.config();

const log = console.log;
mongoose.Promise = global.Promise;

const httpServer = http.createServer(app);

const uri: string = process.env.DB || '';

mongoose.set('strictQuery', true);
// Connect to MongoDB
mongoose.connect(uri,
  {
    dbName: 'event_plan',
    autoIndex: false,
    autoCreate: true,
  })
  .then((connection) => {
    console.log(`Connected to MongoDB! Database name: "${connection.connections[0].name}"`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  log(`Server running`);
});