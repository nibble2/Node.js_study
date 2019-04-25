var express = require('express');
var router = express.Router();

 // GET /users/
 router.get('/users', (req, res) => {
  console.log('네번째 미들웨어') ;
  res.send('Hello users') ;
}) ;

// DELETE /users
router.delete('/users', (req, res) => {
}) ;

module.exports = router;