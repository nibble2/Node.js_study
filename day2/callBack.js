let fs = require("fs") ;
let data = fs.readFileSync('eatting.txt') ;

fs.readFile('eatting.txt', (err, data) => {
    if(err) return console,error(err) ;
    console.log(data.toString()) ;
}) ;

console.log("Program end") ;
