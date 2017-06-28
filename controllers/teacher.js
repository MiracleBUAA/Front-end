/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();
var url = require('url');
var request = require('request');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'teacher' });
});

router.get('/student_list',function (req,res,next) {
    var url = "http://localhost:8080/teacher/student_list"
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        if(!error && response.statusCode == 200){
            res.render('student_list',{ students : dataJson });
        }
    })
}).post('/student_list',function (req,res,next) {
    var url = "http://localhost:8080/teacher/student_list";
    request.post({url:url, form:req.body.students}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect('/teacher/student_list');
        }
    })
})

module.exports = router;