const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const people = require('./routes/people');

const resources = {
  people
};

const peopleApp = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');

  res.send = json => res.end(JSON.stringify(json));

  const id = url.pathname.split('/')[2];
  req.id = id;


  const resource = url.pathname.split('/')[1];
  const resourceRoutes = resources[resource];

  bodyParser(req)
    .then(body => {
      req.body = body;
      resourceRoutes(req, res);
    });
});
module.exports = peopleApp;
