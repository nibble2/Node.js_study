const express = require('express') ;
const cookieParser = require('cookie-parser') ;
const morgan = require('morgan') ;
const path = require('path') ;
const session = require('express-session') ;
const flash = require('flash') ;

const app = express() ;

app.set('view engin', 'pug') ;
app.set('views', path.join(__dirname, 'views')) ;
app.set('port', process.env.PORT || 8081) ; //사용자가 넣어준 포트가 없으면 8081

app.use(morgan('dev')) ;
app.use(express.static(path.join(__dirname, 'public'))) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser('nodebirdsecret')) ;
app.use(session({
    resave: false,
    saveUninitialized: false,
    secreat: 'nodebirdsecret',
    cokie: {
        httpOnly: true,
        secure: false,
    }
})) ;
app.use(flash()) ;

app.listen(app.get('port'), () => {
    console.log('8081포트에서 서버 실행중입니다.') ;
}) ;