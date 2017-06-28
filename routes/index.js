var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Octts团队平台' });
});

router.use('/layout',controller.layout);
router.use('/login', controller.login);
router.use('/student_list', controller.student_list);
router.use('/course_info',controller.course_info);

module.exports = router;
