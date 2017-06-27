/**
 * Created by 刘柘林 on 2017/6/27.
 */
var express = require('express');
var router =  express.Router();
var url = require('url');
var querystring = require('querystring');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'layout' });
});

module.exports = router;
