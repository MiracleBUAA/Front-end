/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();
var request = require('request');
var fs = require('fs');
var _url = require('url');
var URL = "http://localhost:8080/teacher";//后端接口请求头

//检查cookie，存在返回cookie，不存在跳转到登录界面
function check_Cookie(req,res) {
    var teacher = req.cookies.teacher;
    if(teacher) {
        return teacher;
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

//访问teacher主页
router.get('/', function(req, res, next) {
    //res.render('layout_teacher',{title:'OCTTS教师版'});
    var teacher = check_Cookie(req,res);
    res.render('layout_teacher',{title:'OCTTS教师版',username:teacher.uid});
});

//课程信息
router.get('/course_information',function (req,res,next) {
    //res.render('/teacher/course_information',{title:'OCTTS教师版'});
    var teacher = check_Cookie(req,res);
    var url = URL + '/course_information?course_id=' + teacher.course_id;
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/course_information',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                });
        }
    });
}).post('/course_information',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/course_information?uid=' + teacher.uid
        +'&course_id=' + teacher.course_id
        +'&team_limit_information=' + AsciiToUnicode(req.body.team_limit_information)
        +'&teacher_information=' + AsciiToUnicode(req.body.teacher_information)
        +'&course_information=' + AsciiToUnicode(req.body.course_information)
    console.log("URL:"+url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.json({
                url: '/teacher/course_information'
            });
        }
    });
});

//查看学生名单
router.get('/student_list',function (req,res,next) {
    //res.render('teacher/student_list',{title:'OCTTS教师版'});
    var teacher = check_Cookie(req,res);
    var url = URL + '/student_list';
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/student_list',
                {
                    data : dataJson.data.student_list,
                    title:'OCTTS教师版',
                    username:teacher.uid
                });
        }
    });
});

//查看课程资源
router.get('/resource',function (req,res,next) {
    //res.render('teacher/resource',{title:'OCTTS教师版'});
    var teacher = check_Cookie(req,res);
    var url = URL + '/resource?course_id=' + teacher.course_id;
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/resource',
                {
                    data : dataJson.data.resource_list,
                    title:'OCTTS教师版',
                    username:teacher.uid
                });
        }
    });
});

//上传课程资源,返回上传URL
router.post('/resource_upload',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/resource_upload?uid=' + teacher.uid
        + '&course_id=' + teacher.course_id;
    if(req.body.resource_type == '')
        url += '&resource_type=' + '默认';
    else{
        url += '&resource_type=' + req.body.resource_type
    }
    url += '&title=' + req.body.title
    console.log(url);
    res.json({
        url : url
    });
});

//11.	教师——下载课程资源
router.post('/resource_download',function (req,res,next) {
    console.log(req.body);
    var url = URL + '/resource_download?resource_id=' + req.body.resource_id;
    console.log(url);
    res.json({
        url : url
    });
});

//12.	教师——删除课程资源
router.get('/resource_delete',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;

    var url = URL + '/resource_delete?uid=' + teacher.uid
    + '&resource_id=' + params.resource_id;
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.redirect('/teacher/resource');
        }
    });
});

//发布作业信息
router.get('/new_homework',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    res.render('teacher/new_homework',{title:'OCTTS教务版',username:teacher.uid});
}).post('/new_homework',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/new_homework?uid=' + teacher.uid
        +'&course_id=' + teacher.course_id
        +'&homework_title=' + AsciiToUnicode(req.body.homework_title)
        +'&homework_start_time=' + AsciiToUnicode(req.body.homework_start_time)
        +'&homework_end_time=' + AsciiToUnicode(req.body.homework_end_time)
        +'&homework_score=' + req.body.homework_score
        +'&homework_message=' + AsciiToUnicode(req.body.homework_message)
        +'&resubmit_limit=' + req.body.resubmit_limit
    console.log("URL:"+url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到作业列表界面
            res.redirect('/teacher/homework_list');
        }
    });
});

//查看学生作业列表
router.get('/homework_list',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/homework_list?course_id=' + teacher.course_id;
    console.log(url);
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data.homework_list);
        if(!error && response.statusCode == 200){
            res.render('teacher/homework_list',
                {
                    data : dataJson.data.homework_list,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//！！！！！！！！！！！！！！！！！！
//15 查看学生作业     第15个接口不太确定
// router.get('/homework_information',function (req,res,next) {
//     var teacher = check_Cookie(req,res);
//     var params = _url.parse(req.url, true).query;
//     console.log(params);
//     var url = URL + '/homework_information?course_id=' + teacher.course_id
//         + '&homework_id=' + params.homework_id;
//     console.log(url);
//     request(url,function (error,response,body) {
//         var dataJson = eval("(" + body + ")");
//         console.log(dataJson);
//         if(!error && response.statusCode == 200){
//             res.render('teacher/homework_information',
//                 {
//                     data : dataJson.data,
//                     title:'OCTTS教师版',
//                     username:teacher.uid
//                 }
//             );
//         }
//     });
// });


//16 查看,编辑作业信息
router.get('/homework_update',function (req,res,next){
    var teacher = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;

    var url = URL + '/homework_information?course_id=' + teacher.course_id
        + '&homework_id=' + params.homework_id;
    console.log(url);
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/homework_update',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
}).post('/homework_update',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/homework_update?uid=' + teacher.uid
        +'&homework_id='+ req.body.homework_id
        +'&course_id='+ teacher.course_id
        +'&homework_title=' + AsciiToUnicode(req.body.homework_title)
        +'&homework_start_time=' + AsciiToUnicode(req.body.homework_start_time)
        +'&homework_end_time=' + AsciiToUnicode(req.body.homework_end_time)
        +'&homework_score=' + req.body.homework_score
        +'&homework_message=' + AsciiToUnicode(req.body.homework_message)
        +'&resubmit_limit=' + req.body.resubmit_limit
    console.log("URL:"+url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到作业列表界面
            res.redirect('/teacher/homework_list');
        }
    });
});

//17.	教师——删除作业
router.get('/homework_delete',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;

    var url = URL + '/homework_delete?uid=' + teacher.uid
        + '&homework_id=' + params.homework_id;
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到作业列表界面
            res.redirect('/teacher/homework_list');
        }
    });
});

//18.	教师——查看学生提交情况
router.get('/homework_group_upload',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var params = _url.parse(req.url, true).query;

    var url = URL + '/homework_group_upload?course_id=' + teacher.course_id
        + '&homework_id=' + params.homework_id;
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/homework_group_upload',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//19.	教师——作业评分
router.post('/homework_set_score',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/homework_set_score?uid=' + teacher.uid
        + '&course_id=' + teacher.course_id
        + '&homework_id=' + req.body.homework_id
        + '&group_id=' +  req.body.group_id
        + '&score=' + req.body.score
        + '&score_message=' + AsciiToUnicode(req.body.score_message)
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到作业列表界面
            res.redirect('/teacher/homework_group_upload?homework_id='+ req.body.homework_id);
        }
    });
});

//给前端返回一个group_list
router.post('/get_group_list',function (req,res,next){
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var group_url = URL + '/homework_group_upload?course_id=' + teacher.course_id
        + '&homework_id=' + req.body.homework_id;
    console.log(group_url);
    request(group_url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data);
        if(!error && response.statusCode == 200){
            res.json({
                group_list:dataJson.data.group_list
            })
        }
    });
});

//20.	教师——学生提交的作业下载
router.post('/homework_group_download',function (req,res,next){
    console.log(req.body);
    var url = URL + '/homework_group_download?homework_upload_id=' + req.body.homework_upload_id
    console.log("URL:"+url);

    res.json({
        url:url
    })
});

//23.	教师——通知列表
// router.get('/announcement_list',function (req,res,next) {
//     var teacher = check_Cookie(req,res);
//     var url = URL + '/announcement_list?course_id=' + teacher.course_id
//     console.log(url);
//
//     request(url,function (error,response,body) {
//         var dataJson = eval("(" + body + ")");
//         console.log(dataJson);
//         if(!error && response.statusCode == 200){
//             res.render('teacher/announcement_list',
//                 {
//                     data : dataJson.data,
//                     title:'OCTTS教师版',
//                     username:teacher.uid
//                 }
//             );
//         }
//     });
// });

//21.	教师——发布通知
router.get('/announcement',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/announcement_list?course_id=' + teacher.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data);
        if(!error && response.statusCode == 200){
            res.render('teacher/announcement',
                {
                    data : dataJson.data.announcement_list,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
}).post('/new_announcement',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/new_announcement?uid=' + teacher.uid
        + '&course_id=' + teacher.course_id
        + '&announcement_title=' +  AsciiToUnicode(req.body.announcement_title)
        + '&announcement_message=' + AsciiToUnicode(req.body.announcement_message)

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到通知列表界面
            res.redirect('/teacher/announcement');
        }
    });
});

//22.	教师——修改通知
router.post('/announcement_update',function (req,res,next) {
    console.log(req.body);
    var teacher = check_Cookie(req,res);
    var url = URL + '/announcement_update?uid=' + teacher.uid
        + '&course_id=' + teacher.course_id
        + '&announcement_id=' + req.body.announcement_id
        + '&announcement_title=' +  AsciiToUnicode(req.body.announcement_title)
        + '&announcement_message=' + AsciiToUnicode(req.body.announcement_message)

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到通知界面
            res.json({
                url: '/teacher/announcement'
            });
        }
    });
});

//24.	教师——查看已组建团队信息
router.get('/group_confirm_list',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_confirm_list?course_id=' + teacher.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data.group_confirm_list);
        if(!error && response.statusCode == 200){
            res.render('teacher/group_confirm_list',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//25.	教师——查看未审批的团队信息
router.get('/group_apply_list',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_apply_list?course_id=' + teacher.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data.group_apply_list);
        if(!error && response.statusCode == 200){
            res.render('teacher/group_apply_list',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//26.	教师——批准学生团队
router.post('/group_confirm',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_confirm?uid=' + teacher.uid
    + '&course_id=' + teacher.course_id
    + '&group_apply_id=' + req.body.group_apply_id
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到团队列表界面
            res.json({
                url: '/teacher/group_confirm_list'
            });
        }
    });
});

//27.	教师——拒绝学生团队
router.post('/group_reject',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_reject?uid=' + teacher.uid
        + '&course_id=' + teacher.course_id
        + '&group_apply_id=' + req.body.group_apply_id
    console.log(url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //返回到团队列表界面
            res.json({
                url: '/teacher/group_confirm_list'
            });
        }
    });
});

//28.	教师——查看未组队人员
router.get('/student_not_in_group',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/student_not_in_group?course_id=' + teacher.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/student_not_in_group',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//29.	教师——下载团队信息
router.get('/group_download',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_download?course_id=' + teacher.course_id
    console.log(url);

    res.json({
        url:url
    });
})

//30.	教师——查看以往学期
router.get('/old_course',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/old_course'
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/old_course',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//31.	教师——下载以往学期资源

//32.	教师——获取团队成绩报表（待定）
router.get('/group_form',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_form?course_id=' + teacher.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/group_form',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//33.	教师——获取个人成绩报表（待定）
router.get('/student_form',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/student_form?course_id=' + teacher.course_id
    console.log(url);

    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        if(!error && response.statusCode == 200){
            res.render('teacher/student_form',
                {
                    data : dataJson.data,
                    title:'OCTTS教师版',
                    username:teacher.uid
                }
            );
        }
    });
});

//51.	教师——下载团队成绩报表
router.get('/group_form_download',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/group_form_download?course_id=' + teacher.course_id
    console.log(url);

    res.json({
        url:url
    });
})

//52.	教师——下载个人成绩报表
router.get('/student_form_download',function (req,res,next) {
    var teacher = check_Cookie(req,res);
    var url = URL + '/student_form_download?course_id=' + teacher.course_id
    console.log(url);

    res.json({
        url:url
    });
})

module.exports = router;