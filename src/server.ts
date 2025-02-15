import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { Joke } from './app/models/joke';

var jokes: Joke[];
try {
  const data = fs.readFileSync('./jokes.json', 'utf8');
  jokes = JSON.parse(data);
} catch (err) {
  console.error(err);
}

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});


app.get('/joke', (req, res, next) => {
  try {
    const rand = Math.floor(Math.random() * (jokes.length));
    let joke: Joke = jokes[rand];
    if (joke == undefined) throw 'Out of Bounds';
    res.json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post('/joke', (req, res) => {
  let entry: Joke = req.body;
  try {
    jokes.push(entry)
    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
