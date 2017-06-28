var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = req.cookies.user;
    if(user){
        if(user.urank==1){
            res.render('layout_student',{title:'Ottcs学生版',username:user.username});
        }else{
            res.render('layout_teacher',{title:'Ottcs教师版',username:user.username});
        }
    } else{
        res.render('login', { title: 'Octts团队平台' });
    }
});

router.use('/layout',controller.layout);
router.use('/login', controller.login);
router.use('/teacher', controller.teacher);
router.use('/student',controller.student);

module.exports = router;
