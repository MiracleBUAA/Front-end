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
    //res.render('layout_student',{title:'OCTTS学生版'});
    var student = check_Cookie(req,res);
    res.render('layout_student',{
        title:'OCTTS学生版',
        username:student.uid,
        urank: student.urank
    });
});

//34.	学生——查看课程信息
router.get('/course_information',function (req,res,next) {
    //res.render('/student/course_information',{title:'OCTTS学生版'});
    var student = check_Cookie(req,res);
    var url = URL + '/course_information?course_id=' + student.course_id;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/course_information',
                {
                    data : dataJson.data,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
                });
        }
    });
});

//35.	学生——查看课程资源
router.get('/resource',function (req,res,next) {
    //res.render('student/resource',{title:'OCTTS学生版'});
    var student = check_Cookie(req,res);
    var url = URL + '/resource?course_id=' + student.course_id;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/resource',
                {
                    data : dataJson.data.resource_list,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
                });
        }
    });
});

//36.	学生——下载课程资源
router.post('/resource_download',function (req,res,next) {
    console.log(req.body);
    var url = URL + '/resource_download?resource_id=' + req.body.resource_id;
    console.log(url);
    res.json({
        url : url
    });
});

//43.	学生——查看作业列表
router.get('/homework_list',function (req,res,next) {
    var student = check_Cookie(req,res);
    var url = URL + '/homework_list?course_id=' + student.course_id;
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('student/homework_list',
                {
                    data : dataJson.data.homework_list,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
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
    var url = URL + '/homework_information?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&homework_id=' + params.homework_id;
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            console.log(dataJson.data.group_list.length);
            if(dataJson.data.group_list.length == 0){
                console.log('11');
                res.redirect('/student/mygroup');
            }
            if(student.urank == 2){
                res.render('student/homework_information',
                    {
                        data : dataJson.data,
                        title:'OCTTS学生版',
                        username:student.uid,
                        urank: student.urank
                    }
                );
            }
        }
    });
});

//45.	学生——上传作业/homework_upload
router.post('/homework_upload',function (req,res,next){
    //文件上传使用ajax自己解决跳转
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/homework_upload?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&homework_id=' + req.body.homework_id
        + '&group_id=' + req.body.group_id;
    console.log("URL:"+url);

    res.json({
        urank:student.urank,
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
router.get('/homework_delete',function (req,res,next) {
    var student = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;
    var url = URL + '/homework_delete?uid=' + student.uid
        + '&homework_upload_id=' + params.homework_upload_id
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到作业列表界面
            var homework_information= '/student/homework_information?homework_id=' + params.homework_id
            res.redirect(homework_information);
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
            res.render('student/announcement',
                {
                    data : dataJson.data.announcement_list,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
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
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            //已加入团队（不管是否批准）
            if(dataJson.errorNo == 0) {
                res.render('student/mygroup_homemore',{
                    data : dataJson.data,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
                })
            }else if(dataJson.errorNo == 3){
                //未加入团队
                res.render('student/mygroup_homeless',{
                    data : dataJson.data,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
                })
            }
        }
    });
});

//39.	学生——邀请页面
router.get('/invitation',function (req,res,next) {
    var student = check_Cookie(req,res);
    var url = URL + '/invitation?course_id=' + student.course_id
        + '&uid=' + student.uid;
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(response.statusCode);
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            if(dataJson.errorNo == 0) {
                //团队负责人
                res.render('student/invitation_teamee',{
                    data : dataJson.data,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
                })
            }else if(dataJson.errorNo == 3){
                //未加入团队
                res.render('student/invitation_teamer',{
                    data : dataJson.data,
                    title:'OCTTS学生版',
                    username:student.uid,
                    urank: student.urank
                })
            }else if(dataJson.errorNo == 4){
                //团队已经批准了，重定向到我的团队
                res.redirect('/student/mygroup');
            }else if(dataJson.errorNo == 5){
                //加入了一个待批准的团队，重定向到我的团队
                res.redirect('/student/mygroup');
            }
        }
    });
});

//38.	学生——创建新团队
router.post('/new_group',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/new_group?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&group_name=' + AsciiToUnicode(req.body.group_name)
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到我的团队界面
            var _uid = student.uid;
            var _course_id = student.course_id;
            res.clearCookie('student');
            res.cookie('student',{
                  uid:_uid,
                  urank:2,
                  course_id:_course_id
            });
            res.redirect('/student/mygroup');
        }
    });
});

//40.	学生——负责人查看未组队学生信息
// router.get('/student_not_in_group',function (req,res,next) {
//     var student = check_Cookie(req,res);
//     var url = URL + '/invitation?course_id=' + student.course_id
//     console.log(url);
//
//     request(url,function (error,response,body) {
//         var dataJson = eval("(" + body + ")");
//         console.log(dataJson);
//         if(!error && response.statusCode == 200){
//             res.render('student/student_not_in_group',{
//                 data : dataJson.data.student_list,
//                 title:'OCTTS学生版',
//                 username:student.uid,
//                 urank: student.urank
//             })
//         }
//     });
// });

//41.	学生——负责人发出邀请
router.post('/send_invitation',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/send_invitation?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&receiver_id=' + req.body.receiver_id
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到邀请界面
            res.json({
                url:'/student/invitation'
            });
        }
    });
});

//42.	学生——未组队学生接受邀请
router.post('/accept_invitation',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/accept_invitation?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&sender_id=' + req.body.sender_id
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.json({
                url:'/student/mygroup'
            });
        }
    });
});

//53.	学生——未组队学生拒绝邀请
router.post('/reject_invitation',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/reject_invitation?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&sender_id=' + req.body.sender_id
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.json({
                url:'/student/mygroup'
            });
        }
    });
});

//54. 学生——解散未被批准的团队
router.post('/dismiss_group',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/dismiss_group?uid=' + student.uid
        + '&course_id=' + student.course_id
        + '&group_apply_id=' + req.body.group_apply_id
    console.log(url);
    if(student.urank == 2){
        request.post({url:url}, function(error, response, body) {
            console.log(response.statusCode);
            if(error) console.log(error);
            if (!error && response.statusCode == 200) {
                res.json({
                    urank:2,
                    url:'/student/mygroup'
                });
            }
        });
    }else {
        res.json({
            urank:1,
            url:'/student/mygroup'
        });
    }
});

//49.	学生——获取组内评分（负责人）
router.get('/group_rate',function (req,res,next) {
    var student = check_Cookie(req,res);
    var url = URL + '/group_rate?uid=' + student.uid
        + '&course_id=' + student.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(dataJson.errorNo == 1){
            res.redirect('/student/mygroup');
        }
        if(!error && response.statusCode == 200){
            res.render('student/group_rate',{
                data : dataJson.data,
                title:'OCTTS学生版',
                username:student.uid,
                urank: student.urank
            })
        }
    });
});

//56.	学生——传输组内评分（负责人）
router.post('/group_rate',function (req,res,next) {
    console.log(req.body);
    var student = check_Cookie(req,res);
    var url = URL + '/group_rate?uid=' + student.uid
        + '&student_id=' + req.body.student_id
        + '&student_rate=' + req.body.student_rate;
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.json({
                url:'/student/group_rate'
            });
        }
    });
});


module.exports = router;