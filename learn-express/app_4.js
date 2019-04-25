//indexRouter모듈 추가
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

app.use('/', indexRouter) ; //모든 주소 
app.use('users', usersRouter) ; //users주소

module.exports = app ;

//npm i express-session connect-flash 설치
