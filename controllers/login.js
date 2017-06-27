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
    var url = 'http://localhost:8080/login?uid='+ req.body.username + '&password='+req.body.password;
    request(url,function (error,response,body) {
        if(!error && response.statusCode == 200){
            var dataJson = eval("(" + body + ")");
            var result = {code: 0,errmsg:''};
            if(dataJson.errno == 0){
                result.code = 200;
                result.errmsg = dataJson.errmsg;
            }
            else{
                result.code = 400;
                result.errmsg = dataJson.errmsg;
            }
            console.log(result);
            res.json(result);
        }
    });
});

module.exports = router;
