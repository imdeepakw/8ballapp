const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const readWrite = (file, content, res) => {
  fs.readFile(file, (err, data) => {
    res.writeHead(200, {'Content-Type': content});
    res.write(data);
    res.end();
  });
};

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  switch(page) {
    case '/':
      readWrite('index.html', 'text/html', res);
      break;
    case '/api':
      res.writeHead(200, {'Content-Type': 'application/json'});
      let objToJson;
      if(params['env'] === 'forest'){
        objToJson = {
            answer: 'You like trees'
        }
      }else if(params['env'] === 'mountain'){
        objToJson = {
            answer: 'You like the mountains'
        }
      }else{
        objToJson = {
            answer: 'You like the sea'
        }
      }
        res.end(JSON.stringify(objToJson));
      break;
    case '/style.css':
      fs.readFile('style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/main.js':
      readWrite('main.js', 'text/javascript', res);
      break;
    default: 
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
    }
});

server.listen(8000);