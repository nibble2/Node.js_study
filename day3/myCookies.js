const http = require('http') ;
const fs = require('fs') ;
const url = require('url') ;
const qs = require('querystring') ;
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

    const session {} ;

    http.createServer((req, res) => {
        const cookies = parseCookies(req.headers.cookie) ;
        if (req.url.startsWith('/login')) { //로그인 요청이 들어오면
        } else {
          fs.readFile('./myCookies.html', (err, data) => {
            res.end(data)
          })
        }
    })
