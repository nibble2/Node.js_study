//만약 없는 주소가 들어오게 된다면 어떻게 될까 ? = 아무런 라우터에 걸리지 않게되는 상황 
//next도 하지않고 res 응답도 보내지 않으면 클라이언트는 계속 기다리게된다(timeout이 될 때 까지)
//404를 처리할 수 있는 코드를 추가해준다.
const express = require('express') ;
const logger = require('morgan') ; 
const cookieParser = require('cookie-parser') ;
const session = require('express-session') ;
const flash = require('connect-flash') ;
const path = require('path') ;

const indexRouter = require('./routes/index') ; //모듈 추가
const usersRouter = require('./routes/users') ; //모듈 추가
const app = express() ;

app.use(logger('dev')) ;
app.use(express.static(path.join(__dirname, 'public'))) ; 
app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser('secret code')) ;

app.use(session({
    resave: false, 
    saveUninitialized: false, 
    secret: 'secret code', 
    cookie: {
        httpOnly: true, 
        secure: false,
    },
})) ;
app.use(flash()) ;


app.use((req, res, next) => {
    console.log('첫번째 미들웨어') ;
    next() ;
}, (req, res, next) => {
    console.log('두번째 미들웨어') ;
    next() ;
}) ;

app.use('/', indexRouter) ;  
app.use('/users', usersRouter) ; 

//404 NOT FOUND 라우터 밑에 추가
//http 상태코드를 404로 설정하고 메세지를 보냄
app.use((req, res, next) => {
    res.status(404).send('NOT FOUND') ;
}) ;

//500 ERROR
app.use(function(err, req, res, next) {
    console.error(err) ;
    res.status(500),send('SERVER ERROR') ;
  });

module.exports = app ;

//npm i express-session connect-flash 설치
