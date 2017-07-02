/**
 * Created by 刘柘林 on 2017/7/1.
 */
var express = require('express');
var router =  express.Router();
var request = require('request');
var URL = "http://localhost:8080/admin";//后端接口请求头

//检查cookie，存在返回cookie，不存在跳转到登录界面
function check_Cookie(req,res) {
    var admin = req.cookies.admin;
    if(admin) {
        return admin;
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

//访问admin主页
router.get('/', function(req, res, next) {
    //res.render('layout_student',{title:'Ottcs教务版'});
    var admin = check_Cookie(req,res);
    res.render('layout_admin',{title:'Ottcs教务版',username:admin.uid});
});

//显示信息
router.get('/course_information',function (req,res,next) {
    var admin = check_Cookie(req,res);
    var url = URL+ "/course_information";
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data.course_list);
        if(!error && response.statusCode == 200){
            res.render('admin/course_information',{data : dataJson.data.course_list,title:'Ottcs教务版',username:admin.uid});
        }
    })
})

//添加新学期
router.post('/new_course',function (req,res,next) {
    console.log(req.body);
    var admin = check_Cookie(req,res);
    var url = URL + '/new_course?uid=' + admin.uid
        +'&course_year='+req.body.course_year
        +'&course_name=' + AsciiToUnicode(req.body.course_name)
        +'&course_start_time=' + req.body.course_start_time
        +'&course_hour=' + req.body.course_hour
        +'&course_location=' + AsciiToUnicode(req.body.course_location)
        +'&course_credit=' + req.body.course_credit
        +'&teacher_information=' + AsciiToUnicode(req.body.teacher_information)
    console.log("URL:"+url);

    request.post({url:url}, function(error, response, body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson);
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            //console.log('dataJson.data.course_id='+dataJson.data.course_id);
            var username = admin.uid;
            res.clearCookie('admin');
            res.cookie('admin',{
                urank:4, //教务为4
                course_id:dataJson.data.course_id,//学期标识符
                uid:username
            })

            res.json({
                url: '/admin/course_information'
            });
        }
    })
})

//修改课程
router.get('/course_update',function (req,res,next) {
    var admin = check_Cookie(req,res);
    res.render('admin/course_update',{title:'Ottcs教务版',username:admin.uid});
}).post('/course_update',function (req,res,next){
    console.log(req.body);
    var admin = check_Cookie(req,res);
    var url = URL + '/course_update?uid=' + admin.uid
        +'&course_id=' + admin.course_id
        +'&course_year='+req.body.course_year
        +'&course_name=' + AsciiToUnicode(req.body.course_name)
        +'&course_start_time=' + req.body.course_start_time
        +'&course_hour=' + req.body.course_hour
        +'&course_location=' + AsciiToUnicode(req.body.course_location)
        +'&course_credit=' + req.body.course_credit
        +'&teacher_information=' + AsciiToUnicode(req.body.teacher_information)
    console.log("URL:"+url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.json({
                url: '/admin/course_information'
            });
        }
    })
})

//结束课程
router.get('/course_end',function (req,res,next) {
    console.log(req.body);
    var admin = check_Cookie(req,res);
    var url = URL + '/course_end?uid=' + admin.uid
        +'&course_id=' + admin.course_id
    console.log("URL:"+url);

    request.post({url:url}, function(error, response, body) {
        console.log(response.statusCode);
        if(error) console.log(error);
        if (!error && response.statusCode == 200) {
            res.json({
                url: '/admin/course_information'
            });
        }
    })
})

//上传学生名单
router.get('/student_list',function (req,res,next) {
    // res.render('admin/student_list',{title:'Ottcs教务版'});
    var admin = check_Cookie(req,res);
    var url = URL+ "/student_list";
    request(url,function (error,response,body) {
        var dataJson = eval("(" + body + ")");
        console.log(dataJson.data.student_list[1]);
        if(!error && response.statusCode == 200){
            res.render('admin/student_list',{data : dataJson.data.student_list,title:'Ottcs教务版',username:admin.uid});
        }
    })
}).post('/student_list',function (req,res,next){
    //文件上传使用ajax自己解决跳转
    var admin = check_Cookie(req,res);
    var url = URL + '/student_list?uid=' + admin.uid
        +'&course_id=' + admin.course_id;
    console.log("URL:"+url);

    res.json({
        url:url
    })
})

module.exports = router;