//logger 추가
const express = require('express') ;
const logger = require('morgan') ;


const app = express() ;

app.use(logger('dev')) ;
//const logger = () => (req, res, next) => {
//    next() ;
//} 이렇게 안에 next가 내장되어 있어서 자동으로 넘어간다.

app.use((req, res, next) => {
    console.log('첫번째 미들웨어') ;
    next() ;
}) ;

app.use((req, res, next) => {
    console.log('두번째 미들웨어') ;
    next() ;
}) ;

app.get('/', (req, res) => {
    console.log('세번째 미들웨어') ;
    res.send('Hello express') ;
}) ;

app.get('/users', (req, res) => {
    console.log('네번째 미들웨어') ;
    res.send('Hello users') ;
}) ;

//왜 마지막 미들웨어에서는 next를 안붙여도 되는걸까?
//바로 res.send 코드 때문에다. 
//마지막에 res.send 함수를 사용함으로써 응답해주고 종료하기 때문이다.

app.post('/', (req, res) => {
}) ;

app.delete('/users', (req, res) => {
}) ;


//use와 나머지 get,post...(라우팅 미들웨어)등의 차이는 use는 모든 요청을 다 받지만,
//나머지는 주소와 일치하는 요청만 걸러받는다.
module.exports = app ;
