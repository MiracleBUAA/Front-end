/**
 * Created by 胡晟 on 2017/7/4.
 */

//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("group_li").className += " nav-active";
    document.getElementById("rate_li").className += " active";
});

//spinner
$('.spinner-s').spinner({value: 10, step: 2, min: 4, max: 12});