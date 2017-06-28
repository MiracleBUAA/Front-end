/* By ZhuFu on 20160627 */

var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
    res.render('Courseinfo_Teacher', { title: '课程信息' });
});

module.exports = router;
