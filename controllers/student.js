/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();
var request = require('request');
var fs = require('fs');
var _url = require('url');
var URL = "http://localhost:8080/student";//后端接口请求头

//检查cookie，存在返回cookie，不存在跳转到登录界面
function check_Cookie(req,res) {
    var student = req.cookies.student;
    if(student) {
        return student;
    } else{
        res.redirect('/login');
    }
}

//将content转为ucode
function AsciiToUnicode(content) {
    var result = '';
    for (var i=0; i<content.length; i++)
        result+='\\u' + parseInt(content[i].charCodeAt(0),10).toString(16)
    return result;
}

//访问student主页
router.get('/', function(req, res, next) {
    //res.render('layout_student',{title:'Ottcs学生版'});
    var student = check_Cookie(req,res);
    res.render('layout_student',{title:'Ottcs学生版',username:student.uid});
});

//34.	学生——查看课程信息
router.get('/course_information',function (req,res,next) {
    //res.render('/student/course_information',{title:'Ottcs学生版'});
    var student = check_Cookie(req,res);
    var url = URL + '/course_information?course_id=' + student.course_id;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/course_information',
                {
                    data : dataJson.data,
                    title:'Ottcs学生版',
                    username:student.uid
                });
        }
    });
});

//35.	学生——查看课程资源
router.get('/resource',function (req,res,next) {
    //res.render('student/resource',{title:'Ottcs学生版'});
    var student = check_Cookie(req,res);
    var url = URL + '/resource?course_id=' + student.course_id;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/resource',
                {
                    data : dataJson.data.resource_list,
                    title:'Ottcs学生版',
                    username:student.uid
                });
        }
    });
});

//36.	学生——下载课程资源
// router.get('/resource_download',function (req,res,next) {
//     //res.render('student/resource',{title:'Ottcs学生版'});
//     //文件下载仅仅是链接跳转
// })

//43.	学生——查看作业列表
router.get('/homework_list',function (req,res,next) {
    var student = check_Cookie(req,res);
    var url = URL + '/homework_list?course_id=' + student.course_id;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/homework_list',
                {
                    data : dataJson.data.homework_list,
                    title:'Ottcs学生版',
                    username:student.uid
                }
            );
        }
    });
});

//44.	学生——作业信息
router.get('/homework_information',function (req,res,next) {
    var student = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;
    console.log(params);
    var url = URL + '/homework_information?course_id=' + student.course_id
        + '&homework_id=' + params.homework_id;
    console.log(url);
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/homework_information',
                {
                    data : dataJson.data,
                    title:'Ottcs学生版',
                    username:student.uid
                }
            );
        }
    });
});

//45.	学生——上传作业/homework_upload
router.post('/homework_upload',function (req,res,next){
    //文件上传使用ajax自己解决跳转
    var student = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;
    console.log(params);
    var url = URL + '/student_list?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&homework_id=' + params.homework_id;
    console.log("URL:"+url);

    res.json({
        url:url
    })
});

//46.	学生——下载已上传作业
//router.get('/homework_group_download',function (req,res,next){
//     //文件上传使用ajax自己解决跳转
//     var teacher = check_Cookie(req,res);
//     var params = _url.parse(req.url, true).query;
//     console.log(params);
//     var url = URL + '/homework_group_download?homework_id='
//         + '&homework_id=' + params.homework_group_download;
//     console.log("URL:"+url);
//
//     res.json({
//         url:url
//     })
// });

//47.	学生——删除作业
router.post('/homework_delete',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/homework_delete?uid=' + student.uid
        + '&homework_id=' + req.body.homework_id
    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到作业列表界面
            res.json({
                url: '/student/homework_list'
            });
        }
    });
});

//48.	学生——查看通知
router.get('/announcement_list',function (req,res,next) {
    var student = check_Cookie(req,res);
    var url = URL + '/announcement_list?course_id=' + student.course_id;
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/announcement_list',
                {
                    data : dataJson.data.announcement_list,
                    title:'Ottcs学生版',
                    username:student.uid
                }
            );
        }
    });
});



//37.	学生——查看我的团队/mygroup
router.get('/mygroup',function (req,res,next) {
    var student = check_Cookie(req,res);
    var url = URL + '/mygroup?course_id=' + student.course_id
        + '&student_id=' + student.uid;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            //已加入团队（不管是否批准）
            if(dataJson.errorNo == 0) {

            }else if(dataJson.errorNo == 3){
                //未加入团队

            }
        }
    });
});












module.exports = router;