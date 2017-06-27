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
    //console.log(req.body);
    var url = 'http://localhost:8080/login?urank='+req.body.rank+'uid='+ req.body.username + '&password='+req.body.password;
    request(url,function (error,response,body) {
        if(!error && response.statusCode == 200){
            var dataJson = eval("(" + body + ")")
            if(dataJson.errno == 0){
                if(req.body.rank == 1){
                    res.render('layout_student');
                }
                else{
                    res.render('layout_teacher');
                }
            }
        }
    });
});

module.exports = router;
