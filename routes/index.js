var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    var student = req.cookies.student;
    if(student){
        res.render('layout_student',{title:'Ottcs学生版',username:user.uid});
    }
    var teacher = req.cookies.teacher;
    if(teacher){
        res.render('layout_student',{title:'Ottcs学生版',username:user.uid});
    }
    res.render('login', { title: 'Octts团队平台' });
});

router.use('/layout',controller.layout);
router.use('/login', controller.login);
router.use('/teacher', controller.teacher);
router.use('/student',controller.student);

module.exports = router;
