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
    //console.log(req.body);
    var url = 'http://localhost:8080/login?urank='+req.body.rank+'uid='+ req.body.username + '&password='+req.body.password;
    request(url,function (error,response,body) {
        if(!error && response.statusCode == 200){
            var dataJson = eval("(" + body + ")");
            //console.log(dataJson);
            if(dataJson.errno == 0){
                if(req.body.rank == 1){
                    res.cookie('student',{
                        uid:req.body.uid,
                        username:req.body.username
                    }, {
                            maxAge: 900000
                        }
                    );
                    res.render('layout_student',{title:'Ottcs学生版'});
                }
                else{
                    res.cookie('teacher',{
                            uid:req.body.uid,
                            username:req.body.username
                        }, {
                            maxAge: 900000
                        }
                    );
                    res.render('layout_teacher',{title:'Ottcs教师版'});
                }
            }
        }
    });
});
//处理登出路由
router.post('/logout',function (req,res,next) {
    res.redirect('/login');
})

module.exports = router;
