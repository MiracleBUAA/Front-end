var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    var student = req.cookies.student;
    if(student){
        res.render('layout_student',{title:'Ottcs学生版',username:student.uid});
    }
    var teacher = req.cookies.teacher;
    if(teacher){
        res.render('layout_teacher',{title:'Ottcs教师版',username:teacher.uid});
    }
    var admin = req.cookies.admin;
    if(admin){
        res.render('layout_admin',{title:'Ottcs教务版',username:admin.uid});
    }
    res.render('login', { title: 'Octts团队平台' });
});

router.use('/layout',controller.layout);
router.use('/login', controller.login);
router.use('/admin',controller.admin);
router.use('/teacher', controller.teacher);
router.use('/student',controller.student);

module.exports = router;
