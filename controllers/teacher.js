/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();
var url = require('url');
var request = require('request');
var fs = require('fs');

router.get('/', function(req, res, next) {
    //res.render('layout_teacher',{title:'Ottcs教师版'});
    var teacher = req.cookies.teacher;
    if(teacher){
        res.render('layout_teacher',{title:'Ottcs教师版',username:teacher.username});
    }
    else{
        res.redirect('/login');
    }
});

router.get('/course_info',function (req,res,next) {
    console.log("enter");
    res.render('teacher/course_info',{title:'Ottcs教师版'});
    // res.render('teacher/student_list', { title: 'student_list' });
    // var url = "http://localhost:8080/teacher/course_infomation"
    // request(url,function (error,response,body) {
    //     var dataJson = eval("(" + body + ")");
    //     if(!error && response.statusCode == 200){
    //         res.render('teacher/course_info',{ course_info : dataJson });
    //     }
    // })
}).post('/course_info',function (req,res,next) {
    console.log("enter");
    var url = "http://localhost:8080/teacher/course_information?course_id=1";
    url += "&course_name=" + req.body.course_name
        +"&course_start_time=" + req.body.course_start_time
        +"&course_end_time=" + req.body.course_end_time
        +"&course_hour=" + req.body.course_hours
        +"&course_location=" + req.body.course_location
        +"&credit=" + req.body.credit
        +"&team_limit_information=" + req.body.team_limit_information
        +"&teacher_information=" + req.body.teacher_information
        +"&course_information=" + req.course_information;
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            console.log("111");
            res.redirect('/teacher/student_list');
        }
    })
});

router.get('/student_list',function (req,res,next) {
    res.render('teacher/student_list');
    // var url = "http://localhost:8080/teacher/student_list"
    // request(url,function (error,response,body) {
    //     var dataJson = eval("(" + body + ")");
    //     console.log(dataJson);
    //     if(!error && response.statusCode == 200){
    //         //console.log("enter");
    //         res.render('teacher/student_list',{ students : dataJson });
    //     }
    // })
}).post('/student_list',function (req,res,next) {
    var url = "http://localhost:8080/teacher/student_list";
    // console.log(req.body.file);
    // res.redirect('/teacher/student_list');
    var r = request.post('http://localhost:8080/teacher/student_list',function (error,response,body) {
        if(error) console.log(error);
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            res.redirect('/teacher/student_list');
        }
    })
    var form = r.form();
    console.log("111");
    //fs.createReadStream(req.body);
    //这里使用的静态路径，实际测试需要修改
    form.append('file', fs.createReadStream('student_list.xls'));
    // res.redirect('/teacher/student_list');
    // console.log(formData);
    // var formData = {
    //     file: fs.createReadStream("student_list.xls")
    // };
    // // console.log(formData + "122 ");
    // request.post({url:url, formdata:formData}, function(error, response, body) {
    //     console.log(response.statusCode);
    //     if (!error && response.statusCode == 200) {
    //         //res.redirect('/teacher/student_list');
    //     }
    // })
});

router.get('/resource',function (req,res,next) {
    var url = "http://localhost:8080/teacher/resource";
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        if(!error && response.statusCode == 200){
            res.render('teacher/resource',{ students : dataJson });
        }
    })
}).post('/resource',function (req,res,next) {

})

router.get('/homework_list',function (req,res,next) {

}).post('/homework_list',function (req,res,next) {

})

router.get('/homework_new',function (req,res,next) {
    res.render('teacher/homework_new',{title:'Ottcs教师版'});
}).post('/homework_new',function (req,res,next) {

})

router.get("/upload",function (req, res, next) {
    res.render("teacher/upload",{title:"上传课程资源"});
})
module.exports = router;