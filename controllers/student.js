/**
 * Created by 刘柘林 on 2017/6/28.
 */
var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
    res.render('layout_student',{title:'Ottcs学生版'});
});

module.exports = router;