const express = require('express') ;
const router = express.Router() ; //express 객체에서 Router를 꺼내와 모듈로 만들었다.

/* router.get('/', (req, res, next) => {
  console.log('세번쨰 라우터 미들웨어') ;
  try {
    throw new Error('서버를 고장내보자') ;
  } catch(error) {
    next(error) ; //미들웨어를 다 건너뛰고 에러처리 미들웨어로 이동한다.
  }
}) ;
 */
/* router.get('/', (req, res) => {
  console.log('세번째 미들웨어') ;
  res.send('정상 라우터') ;
}) ; */

//파일을 보내고 싶을 때
router.get('/', (req, res) => {
  console.log('세번째 미들웨어') ;
  //res.sendFIle('html 파일') ;
  //res.render('test') ;
  res.render('test', {
    title2 : '익스프레스' ,
  }) ;
}) ;

router.get('/posts', (req, res) => {
}) ;

router.get('/comments', (req, res) => {
}) ;

router.get('/list', (req, res) => {
}) ;

router.post('/', (req, res) => {
}) ;

<<<<<<< HEAD
module.exports = router ;
=======
module.exports = router ;
>>>>>>> 024318f549562c81fe4c51a1bd69ad6998d6caa1
