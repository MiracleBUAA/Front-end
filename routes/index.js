var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Octts团队平台' });
});

router.use('/layout',controller.layout);
router.use('/login', controller.login);
router.use('/teacher', controller.teacher);
router.use('/student',controller.student);

module.exports = router;
