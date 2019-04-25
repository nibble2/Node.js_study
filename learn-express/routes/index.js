<<<<<<< HEAD
const express = require('express') ;
const router = express.Router() ; //express 객체에서 Router를 꺼내와 모듈로 만들었다.
=======
const express = require('express');
const router = express.Router(); 
>>>>>>> 214d5025d7533a64593ddc625829757f83c6dd9e

router.get('/', function(req, res, next) {
<<<<<<< HEAD
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
=======
  res.render('index', { title: 'Express' });
}) ;

router.get('/', (req, res) => {
  console.log('세번재 미들웨어') ;
  res.send('Hello express!!') ;
}) ;

router.get('posts', (req, res) => {
}) ;

router.get('comments', (Req, res) => {
}) ;

router.get('list', (req, res) => {
}) ;

router.post('/', (req,res) => {
}) ;


module.exports = router;
>>>>>>> 214d5025d7533a64593ddc625829757f83c6dd9e
