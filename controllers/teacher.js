/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();
var url = require('url');
var request = require('request');
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'teacher' });
});

router.get('/student_list',function (req,res,next) {
    console.log("enter");
    res.render('teacher/student_list', { title: 'student_list' });
    // var url = "http://localhost:8080/teacher/student_list"
    // request(url,function (error,response,body) {
    //     var dataJson = eval("(" + body + ")");
    //     if(!error && response.statusCode == 200){
    //         res.render('teacher/student_list',{ students : dataJson });
    //     }
    // })
}).post('/student_list',function (req,res,next) {
    var url = "http://localhost:8080/teacher/student_list";
    var formData = {
        file: fs.createReadStream(req.body.formData),
    };
    request.post({url:url, formdata:formData}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect('/teacher/student_list');
        }
    })
});

router.get('/resource',function (req,res,next) {
    var url = "http://localhost:8080/teacher/resource";
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        if(!error && response.statusCode == 200){
            res.render('teacher/student_list',{ students : dataJson });
        }
    })
}).post('/resource',function (req,res,next) {

})

router.get('/homework_list',function (req,res,next) {

}).post('/homework_list',function (req,res,next) {

})

router.get('/homework_new',function (req,res,next) {

}).post('/homework_new',function (req,res,next) {

})

module.exports = router;