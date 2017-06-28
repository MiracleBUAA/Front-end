/**
 * Created by ZhuFu on 2017/6/28.
 */

var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
    res.render('Studentlist_Teacher', { title: '课程信息' });
});

module.exports = router;
