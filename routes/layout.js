/**
 * Created by lenovo on 2017/6/27.
 */
var express = require('express');
var router = express.Router();

/* GET layout page. */

router.get('/',function(req, res, next) {
  res.render('layout',{title:'Layout'});
});

module.exports = router;
