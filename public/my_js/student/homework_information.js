/**
 * Created by 12638 on 2017/7/2.
 */


//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("homework_li").className += " active";
});




$(document).ready(function () {

    $("#upload_button").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        fire_ajax_submit();

    });


    var _end=$("#end").html();
    var end_time=new Date(_end);
    var now = new Date().getTime();

    if (now-end_time>0){
        $("#end").html(_end+"<font color='red'> (已结束)</font>");
        $("#upl").html('');
        $('.dele').prop("disabled", true);

    }
    else
        $("#end").html(_end+"<font color='green'> (进行中)</font>");




});

var file_name;
function getFileName(s){
     var pos=s.lastIndexOf("\\");
     return s.substring(pos+1);
}
document.getElementById("upload_file").onchange=function () {
    file_name = getFileName(this.value);
}

function fire_ajax_submit() {

    // Get form
    var form = $('#upload_form')[0];

    var file_data = new FormData(form);


    // for (var value11 of file_data.values()) {
    //     console.log(value11);
    // }


    $("#upload_button").prop("disabled", true);

    var homeworkID = Number(document.getElementById("upload_form").getAttribute("data-homework-id"));
    var groupID = Number(document.getElementById("upload_form").getAttribute("data-group-id"));

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/student/homework_upload',
        data: {
            homework_id: homeworkID,
            group_id:groupID
        },
        error: function () {
            alert("请求url错误！");
        },
        success: function (res) {
            //alert(res.url);
            $.ajax({
                type: 'post',
                enctype: 'multipart/form-data',
                url: res.url,
                data: file_data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    //alert("success");
                    window.location.href = "/student/homework_information?homework_id=" + homeworkID;
                },
                error: function (e) {
                    //alert("error");
                    console.log("ERROR :", e);
                    window.location.href = "/student/homework_information?homework_id=" + homeworkID;
                }
            });
        }
    });
}





//JavaScript函数：
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;
function getDateDiff(dateTimeStamp){
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
        result="发布于" + parseInt(monthC) + "个月前";
    }
    else if(weekC>=1){
        result="发布于" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result="发布于"+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result="发布于"+ parseInt(hourC) +"个小时前";
    }
    else if(minC>=1){
        result="发布于"+ parseInt(minC) +"分钟前";
    }else
        result="刚刚发布";
    return result;
}

