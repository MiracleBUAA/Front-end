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


// 时间约束
function OnChange () {

    var _start = $("#start").val();
    var _end=$('#end').val();
    var start_time=new Date(_start);
    var end_time=new Date(_end);
    if (start_time-end_time>0)
    {
        alert("截止时间不能早于开始时间！");
        $('#sub').prop("disabled", true);
        $('#sub').html("时间错误，请修改");
    }
    else{
        $('#sub').prop("disabled", false);
        $('#sub').html("确认发布");
    }
}


//spinner
$('.spinner-s').spinner({value: 10, step: 1, min: 1, max: 40});