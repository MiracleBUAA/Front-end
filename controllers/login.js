/**
 * Created by lenovo on 2017/6/27.
 */
var express = require('express');
var router =  express.Router();
var url = require('url');
var querystring = require('querystring');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/check', function(req, res, next){
    var result = {code: 0,errmsg:''};
    var url = 'http://www.miracleoctts.com/auth/login?uid='+ req.body.username + '&password='+req.body.password;
    request(url,function (error,response,body) {
        if(!error && response.statusCode == 200){
            if(body.errno == 1){
                result.code = 200;
                result.errmsg = body.errmsg;
            }
            else{
                result.code = 400;
                result.errmsg = body.errmsg;
            }
        }
    });
    res.json(result);
});

module.exports = router;
