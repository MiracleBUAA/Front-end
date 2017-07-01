/**
 * Created by 胡晟 on 2017/6/28.
 */


//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("homework_li").className += " nav-active";
    document.getElementById("new_homework_li").className += " active";
});



//  时间选择器初始化
$(".form_datetime-component").datetimepicker({
    format: "yyyy-mm-dd hh:ii:ss"
});
