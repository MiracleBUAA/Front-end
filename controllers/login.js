/**
 * Created by lenovo on 2017/6/27.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/check', function(req, res, next){
  if(req.body.username == 'abc' && req.body.password == '123'){
    result = {
              code: 200,
              msg: '密码正确'
            };
  }
  else{
    result = {
              code: 400,
              msg: '密码错误'
            };
  }
  res.json(result);
});

module.exports = router;
