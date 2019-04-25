const express = require('express') ;

const app = express() ;

app.use((req, res, next) => {
    console.log('첫번째 미들웨어') ;
    next() ;
}) ;

app.use((req, res, next) => {
    console.log('두번째 미들웨어') ;
    next() ;
}) ;

app.use((req, res) => {
    console.log('세번째 미들웨어') ;
    res.send('Hello express') ;
}) ;

//왜 세번째 미들웨어에서는 next를 안붙여도 되는걸까?
//바로 res.send 코드 때문에다. 
//마지막에 res.send 함수를 사용함으로써 응답해주고 종료하기 때문이다.

app.get('/', (req, res) => {
    res.send('Hello get') ;
}) ;
//http에서 get 요청이고 '/'로 들어오는 것만 받는다.

app.get('/users', (req, res) => {
    res.send('Hello users') ;
}) ;

app.post('/', (req, res) => {
}) ;

app.delete('/users', (req, res) => {
}) ;


//use와 나머지 get,post...(라우팅 미들웨어)등의 차이는 use는 모든 요청을 다 받지만,
//나머지는 주소와 일치하는 요청만 걸러받는다.
module.exports = app ;

