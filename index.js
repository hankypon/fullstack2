const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req,res){
  // Router
switch(true){
  case req.url === '/' && req.method === 'GET' :
    fs.readFile('./views/home.html',(err,file) => {
      res.setHeader('content-type', 'text/html');
      res.end(file);    
    });
    break;
  case req.url === '/script.js' && req.method === 'GET' :
    fs.readFile('./public/script.js',(err,file) => {
      res.setHeader('content-type', 'application/javascript');
      res.end(file);    
    });
    break;
  case req.url === '/phones' && req.method === 'GET' :
    fs.readFile('./phones.json',(err,file) => {
      res.setHeader('content-type', 'application/json');
      res.end(file);    
    });
    break;
    case req.url === '/phones' && req.method === 'POST' :
      let body ='';  
      req.on('data', function(chunk){
        body += chunk.toString();
        console.log(chunk.toString());
      });
      req.on('end', function(){
        const newPhone = JSON.parse(body);
        fs.readFile('./phones.json', (err, data) => {
            const phones = JSON.parse(data);
            console.log(phones);
            phones.push(newPhone);
        fs.writeFile('./phones.json', JSON.stringify(phones), () => {
          res.end(JSON.stringify(newPhone));
        } )
        });
    
      })
    break;

  default:
    res.end('404');

}


});

server.listen(3000);