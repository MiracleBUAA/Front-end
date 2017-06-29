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

//处理登录密码核定
router.post('/check', function(req, res, next){
    console.log(req.body);
    var url = 'http://localhost:8080/login?urank='+req.body.urank+'&uid='+ req.body.username + '&password='+req.body.password;
    request(url,function (error,response,body) {
        if(!error && response.statusCode == 200){
            var dataJson = eval("(" + body + ")");
            console.log(dataJson);
            if(dataJson.errorNo == 0){
                if(req.body.urank == 1){
                    res.cookie('student',{
                        urank:req.body.urank,
                        uid:req.body.username
                    }, {
                            maxAge: 900000
                        }
                    );
                    res.json(200,{msg:"Login success",url:"/student"});
                } else{
                    res.cookie('teacher',{
                        urank:req.body.urank,
                        uid:req.body.username
                    }, {
                            maxAge: 900000
                        }
                    );
                    res.json(200,{msg:"登录成功",url:"/teacher"});
                }
            }
            else{
                res.json(200,{msg:dataJson.errorMsg,url:"/login"});
            }
        }
    });
});
//处理登出路由
router.get('/logout',function (req,res,next) {
    res.clearCookie('student');
    res.clearCookie('teacher');
    res.redirect('/login');
})

module.exports = router;
