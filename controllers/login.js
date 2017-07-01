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
    //console.log(url);
    request(url,function (error,response,body) {
        if(!error && response.statusCode == 200){
            var dataJson = eval("(" + body + ")");
            console.log(dataJson);
            if(dataJson.errorNo == 0){
                if(req.body.urank == 1){
                    //学生登录
                    res.cookie('student',{
                        urank:dataJson.data.urank,//普通学生为1，团队负责人为2
                        course_id:dataJson.data.course_id,//学期标识符
                        uid:req.body.username
                    }, {
                            maxAge: 900000
                        }
                    );
                    res.json(200,{msg:"登录成功",url:"/student"});
                } else if(req.body.urank == 3){
                    //老师登录
                    res.cookie('teacher',{
                        urank:req.body.urank, //教师为3
                        course_id:dataJson.data.course_id,//学期标识符
                        uid:req.body.username
                    }, {
                            maxAge: 900000
                        }
                    );
                    res.json(200,{msg:"登录成功",url:"/teacher"});
                }else{
                    //教务登录
                    res.cookie('admin',{
                        urank:req.body.urank, //教务为4
                        course_id:dataJson.data.course_id,//学期标识符
                        uid:req.body.username
                    }, {
                            maxAge: 900000
                        }
                    );
                    res.json(200,{msg:"登录成功",url:"/admin"});
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
    res.clearCookie('admin');
    res.redirect('/login');
})

module.exports = router;
