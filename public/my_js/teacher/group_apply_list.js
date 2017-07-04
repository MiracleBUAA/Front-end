/**
 * Created by 胡晟 on 2017/7/4.
 */


// 页面侧边栏选中
$(document).ready(function () {
    document.getElementById("group_li").className += " nav-active";
    document.getElementById("grouping_li").className += " active";
});


$('.reject-in').click(function () {
    $(this).parents(".panel").parent().remove();
});