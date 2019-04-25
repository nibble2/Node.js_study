const express = require('express') ;
const logger = require('morgan') ; //morgan 미들웨어 추가, 요청에 대한 정보를 콘솔에 기록해주는 역할.
const cookieParser = require('cookie-parser') ;
const session = require('express-session') ;
const flash = require('connect-flash') ;
const path = require('path') ;
//모건, 쿠키파서는 다른사람이 만든 모듈이기 때문에 추가해주어야 한다.

const app = express() ;

app.use(logger('dev')) ;
app.use(express.static(path.join(__dirname, 'public'))) ; //정적 파일들을 가져와주는 미들웨어
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser('secret code')) ; //쿠키 파서를 활성화, session과 같이 사용
//쿠키는 클라이언트에 저장, 서버가 응답으로 온것을 저장, 그 쿠키가 진짜 서버가 보낸것이 맞는지 확인하는 비밀키가 필요하다.
//그리고 다시 응답을 해줄때 쿠키를 다시 보낸다. 일종의 비밀번호

//const session = {}
//세션은 메모리를 가지고있다, 메모리 세션아이디를  쿠키로 사용하기 때문에 쿠키가 필요하다.

app.use(session({
    resave: false, //세션 객체에 수정하상이 없더라도 저장을 할지
    saveUninitialized: false, //true일때 처음의 빈 세션객체라도 저장을 할지
    secret: 'secret code', //쿠키의 시크릿
    cookie: {
        httpOnly: true, //세션 쿠키를 httpOnly로 쓸지
        secure: false,
    },
})) ; //메모리 세션을 활성화
app.use(flash()) ;
//로그인 실패했을 때 일회성 팝업 메세지를 표시해주는 미들웨어

app.use((req, res, next) => {
    console.log('첫번째 미들웨어') ;
    next() ;
}, (req, res, next) => {
    console.log('두번째 미들웨어') ;
    next() ;
}) ; //app.use를 하나로 사용 가능

app.get('/', (req, res) => {
    console.log('세번째 미들웨어') ;
    res.send('Hello express') ;
}) ;

app.get('/users', (req, res) => {
    console.log('네번째 미들웨어') ;
    res.send('Hello users') ;
}) ;

app.post('/', (req, res) => {
}) ;

app.delete('/users', (req, res) => {
}) ;

module.exports = app ;

//npm i express-session connect-flash 설치
//미들웨어의 선언 순서는 중요하다. 먼저 선언 되느냐 안되느냐에 따라 실행되거나 안될 수 있다.
//static 모듈이 두번째에 있는 이유
//static은 public에 원하는 파일이 없을때 next를 한다.
//어떤 요청이 왔는지 기록을 하고, 파일을 찾았으면 next를 하지 않고 끊어버린다.