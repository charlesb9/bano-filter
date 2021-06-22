const http = require('http');
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

  });

app.use('/api/ban/:filter/', (req, res, next) => {

  let query = req.query.q
  let arg = query.split(' ').join('+')
  let filter = req.params.filter
  
  new Promise((resolve, reject) => {
      
      const http = require('http');    
      http.get(`http://api-adresse.data.gouv.fr/search/?q=${filter}+${arg}`, (res) => {
      
          res.setEncoding('utf8');
          let data = ''
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
              resolve(data)
          })
  
      })   
  })  .then(response => {
              res.status(200).json(response)
          })
      .catch(error => {
              res.status(404).json({error: error})
          });
  
  });

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
