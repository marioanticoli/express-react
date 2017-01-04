import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Home from './components/home';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  res.send(template({
    body: renderToString(<Home />),
    title: 'Home',
  }));
});

server.listen(8081);
