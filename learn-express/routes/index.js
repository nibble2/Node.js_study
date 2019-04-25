const express = require('express');
const router = express.Router(); 

/* GET home page. */
router.get('/', function(req, res, next) {
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