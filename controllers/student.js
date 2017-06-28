/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
    var student = req.cookies.student;
    if(student){
        res.render('layout_student',{title:'Ottcs学生版',username:student.username});
    }
    else{
        res.redirect('/login');
    }
});

router.get('/notice_student',function (req,res,next) {
    console.log("enter");
    res.render('student/notice_student',{title:'Ottcs学生版'});
});

module.exports = router;