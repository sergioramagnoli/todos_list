import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
 
const server = express();

export const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(  
        AppModule,
        new ExpressAdapter(expressInstance),
    );
    return app.init();
};
 
console.log("Hola mundo")

createNestServer(server)
    .then((v) => console.log('Nest Ready'))
    .catch((err) => console.error('Nest broken', err));

export const api =
    functions.region('us-central1').https.onRequest(server);
export const ap2i =
    functions.region('us-central1').https.onRequest(server);
