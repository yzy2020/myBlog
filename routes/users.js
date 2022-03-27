var express = require('express');
var router = express.Router();
const user = require('../dao/users_dao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res){
  user.login(req, res)
}) ;

router.get('/getUsers', function(req, res){
  user.Users(req, res)
})

router.post('/updateUserInfo', function(req, res){
  user.updateUserInfo(req, res)
})

router.post('/createUserInfo', function(req, res){
  user.createUserInfo(req, res)
})

router.post('/deleteUserInfo', function(req, res){
  user.deleteUserInfo(req, res)
})

module.exports = router;
