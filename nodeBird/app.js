const express = require('express') ;
const cookieParser = require('cookie-parser') ;
const morgan = require('morgan') ;
const path = require('path') ;
const session = require('express-session') ;
const flash = require('connect-flash') ;
require('dotenv').config() ; // process.env에 들어간다.

const indexRouter = require('./routes/index') ;
//const userRouter = require('./routers/user') ;
const app = express() ;

app.set('view engine', 'pug') ;
app.set('views', path.join(__dirname, 'views')) ;
app.set('port', process.env.PORT || 8081) ; //사용자가 넣어준 포트가 없으면 8081

app.use(morgan('dev')) ; //개발모드
app.use(express.static(path.join(__dirname, 'public'))) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser(process.env.COOKIE_SECRET)) ;
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
})) ;
app.use(flash()) ; //일회성 메세지 

app.use('/', indexRouter) ;

app.use((req, res, next) => {
    const err= new Error('Not Found') ;
    err.status = 404 ;
    next(err) ;
}) ;

app.use((err, req, res) => {
    res.locals.message = err.message ;
    res.locals.error = req.app.get('env') === 'development' ? err : {} ;
    res.status(err.status || 500) ;
    res.render('error') ;
}) ;

app.listen(app.get('port'), () => { //app.set 포트를 app.get으로 가져올 수 있다.
    console.log(`${app.get('port')}번 포트에서 서버 실행 중 입니다.` ) ;
}) ;