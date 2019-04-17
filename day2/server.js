const http = require('http') ;
http.createServer((request, response) => {
    // response.writeHead( 200, {'Content-Type' : 'text/plain'})
    response.end("hello Ilhan") ;

    console.log('server start') ;


}).listen(8080) ;