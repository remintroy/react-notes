import express from 'express';
import http from 'http';
import expressConfig from './lib/webserver/express';
import expressRoutes from './lib/webserver/routes';
import connectToMongodb from './lib/mongodb/connection';
import serverConfig from './lib/webserver/index.ts';

const app = express();
const server = http.createServer(app);

connectToMongodb();

expressConfig(app);

expressRoutes(app, express);

serverConfig(server).startServer();

// TODO: remove unused middlewares