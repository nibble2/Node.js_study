const express = require('express') ;
const router = express.Router() ; //express 객체에서 Router를 꺼내와 모듈로 만들었다.

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express' }) ;
}) ;

router.get('/', (req, res) => {
  console.log('세번째 미들웨어') ;
  res.send('Hello express') ;
}) ;

router.get('/posts', (req, res) => {
}) ;

router.get('/comments', (req, res) => {
}) ;

router.get('/list', (req, res) => {
}) ;

router.post('/', (req, res) => {
}) ;

module.exports = router ;