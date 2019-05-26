const http = require('http') ;
const fs = require('fs') ;

const user = {} ; //db 가 없으니 user 로 대체

http.createServer((req, res) => {
    if (req.method === 'GET') {
      if (req.url === '/') {
        return fs.readFile('./restFront.html', (err, data) => {
          if (err) {
            throw err;
          }
          res.end(data);
        });
      } else if (req.url === '/about') {
        return fs.readFile('./about.html', (err, data) => {
          if (err) {
            throw err;
          }
          res.end(data);
        });
      } else if (req.url === '/users') {
        return res.end(JSON.stringify(users));
      }

}).listen(8080, () => {
    console.log('8080에서 서버 대기중입니다') ;
})