const events = require('events') ;

const eventEmitter = new events.EventEmitter() ;


const connectHandler = function connected() {
    console.log("Connected Successful") ;
    eventEmitter.emit("data_received") ;

}

eventEmitter.on('Connection', connectHandler) ;

eventEmitter.on('data_received', function(){
    console.log("Data_received") ;
});

eventEmitter.emit('connection') ;
console.log("Program end") ;