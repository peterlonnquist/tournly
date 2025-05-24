/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { PrismaClient } from '@prisma/client';
import express from 'express';
import * as path from 'path';

const prisma = new PrismaClient();

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournly-api!' });
});

app.get('/api/users', async (req, res) => {
  res.send(await prisma.user.findMany());
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
