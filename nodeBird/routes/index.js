const express = require('express') ;
const router = express.Router() ;

 //프로필 페이지
router.get('/profile', (req, res) => {
 res.render('profile', { title: '내정보 - NodeBird', user: null }) ;
}) ;

//회원가입 페이지
router.get('/join', (req, res) => {
 res.render('join', {
     title: '회원가입 - NodeBird',
     user: null,
     joinError: req.flash('joinError'), //일회성 메세지 에러
 }) ;
}) ;

//메인 페이지
router.get('/', (req, res, next) => {
 res.render('main', {
     title: 'NodeBird',
     twits: [],
     user: null,
     loginError: req.flash('loginError'),
 }) ;
}) ;

module.exports = router ;