//pug
const express = require('express') ;
const logger = require('morgan') ; 
const cookieParser = require('cookie-parser') ;
const session = require('express-session') ;
const flash = require('connect-flash') ;
const path = require('path') ;

const indexRouter = require('./routes/index') ; 
const usersRouter = require('./routes/users') ; 

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

//404 NOT FOUND 라우터 밑에 추가
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
//express learn-express --view=pug
