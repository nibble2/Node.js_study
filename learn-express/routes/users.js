const express = require('express') ;
const router = express.Router() ;

 // GET /users/

 router.get('/', (req, res) => {
  console.log('네번째 미들웨어') ;
  res.send('Hello Users!!') ;
}) ;

// DELETE /users
router.delete('/', (req, res) => {
}) ;

module.exports = router ;
