var express = require('express');
var router = express.Router();

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 */

 // GET /users/
router.get('/', (req, res) => {
  console.log('네번째 미들웨어') ;
  res.send('Hello users') ;
}) ;

// DELETE /users/
router.delete('/', (req, res) => {
}) ;

module.exports = router;
