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
        // obj of possible responses 1: try again, 2: definitely not
        const responses = {
            0: "Ask your cat",
            1: 'Definitely not',
            2: 'Absolutely',
            3: "I don't know",
            4: "You tell me",
            5: "Reply hazy, try again...",
            6: "Without a doubt",
            7: "Signs point to YES!",
            8: "Better not tell you now",
            9: "Ask me tomorrow again", 
            10: "Outlook not so good",
            11: "Very doubtful",
            12: "Why are you asking me? Ask your therapist."
        };
        let key = (Math.random() * 12).toFixed(0);
        const objToJson = {
          answer: responses[key],
          index: key
        };
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