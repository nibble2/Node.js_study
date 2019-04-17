const http = require("http") ;

http.createServer(function(require,response) {

    response.writeHead( 200, {'content-Type' : 'text/plain'}) ;

    response.end("Hello IlHan") ;

}).listen(8080);
