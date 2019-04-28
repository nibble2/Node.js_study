/* var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

//indexRouter모듈 추가
const express = require('express') ;
const logger = require('morgan') ; 
const cookieParser = require('cookie-parser') ;
const session = require('express-session') ; 
const flash = require('connect-flash') ;
const path = require('path') ;

const indexRouter = require('./routes/index') ; //모듈 추가
const usersRouter = require('./routes/users'); //모듈 추가

const app = express() ;

app.set('views', path.join(__dirname, 'views')) ; //이 엔진은 views밑에 패스로 잡아놓는다.
app.set('view engine', 'pug') ; // view 엔진으로 pug를 사용하겠다.

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

app.use((req, res, next) => {
  res.status(404).send('NOT FOUND') ;
}) ;

app.use(function(err, req, res, next) {
  console.error(err) ;
  res.status(500),send('SERVER ERROR') ;
});
module.exports = app ;

//npm i express-session connect-flash 설치
