/**
 * Created by lenovo on 2017/7/1.
 */

/**
 * Created by lenovo on 2017/7/1.
 */
    var curID, curELE;

    function show(s){
      if(s == "提交"){
          document.getElementById("tit").value = "";
          document.getElementById("det").value = "";
      }
      document.getElementById("bubble").innerHTML = s;
      document.getElementById("pop").style.display = "block";
      document.getElementById("fade").style.display = "block";
    }
    function hide() {
        document.getElementById("pop").style.display = "none";
        document.getElementById("fade").style.display = "none";
    }
    document.getElementById("bubble").addEventListener("click",function (){
        hide();
        var _tit = $("#tit").val();
        var _det = $("#det").val();
        if(document.getElementById("bubble").innerHTML == "提交") {
            $.ajax({
                url: "/teacher/new_announcement",
                data: {
                    announcement_title: _tit,
                    announcement_message: _det
                },
                dataType: 'json',
                type: 'post',
                error:function () {
                    alert("error");
                },
                success: function (response) {
                    window.location.href = response.url;
                }
            });

        }else{
            $.ajax({
                url: "/teacher/announcement_update",
                data: {
                    announcement_id: curID,
                    announcement_title: _tit,
                    announcement_message: _det
                },
                dataType: 'json',
                type: 'post',
                error:function () {
                  alert('error');
                },
                success: function (res) {
                    window.location.href = res.url;
                    // curELE.setAttribute("data-tit",_tit);
                    // curELE.setAttribute("data-det",_det);
                    // curELE.innerHTML =
                    //     "<td><div class='alert alert-block alert-danger fade in'>"+
                    //     "<button type='button' data-dismiss='alert' class='close close-sm'>"+
                    //     "<i class='fa fa-times'>"+
                    //     "</i></button><strong>"+_tit+"</strong><i>&nbsp;"+_det+"</i></div></td>"+
                    //     "<td style='padding-top: 24px;'><strong>"+curELE.getAttribute("data-teacher")+"</strong></td>"+
                    //     "<td style='padding-top: 24px;color:red;'>"+curELE.getAttribute("data-time")+"</td>"+
                    //     "<td>"+
                    //     "<button type='button' onclick='edit(this)' style='margin-top: 10px;' class='btn btn-info'>"+
                    //     "<span class='glyphicon glyphicon-edit'></span><i>编辑信息</i></button></td>";
                }
            });
            // 前端测试

            //         curELE.setAttribute("data-tit",_tit);
            //         curELE.setAttribute("data-det",_det);
            //         curELE.innerHTML =
            //             "<td><div class='alert alert-block alert-danger fade in'>"+
            //             "<button type='button' data-dismiss='alert' class='close close-sm'>"+
            //             "<i class='fa fa-times'>"+
            //             "</i></button><strong>"+_tit+"</strong><i>&nbsp;"+_det+"</i></div></td>"+
            //             "<td style='padding-top: 24px;'><strong>"+curELE.getAttribute("data-teacher")+"</strong></td>"+
            //             "<td style='padding-top: 24px;color:red;'>"+curELE.getAttribute("data-time")+"</td>"+
            //             "<td>"+
            //             "<button type='button' onclick='edit(this)' style='margin-top: 10px;' class='btn btn-info'>"+
            //             "<span class='glyphicon glyphicon-edit'></span><i>编辑信息</i></button></td>";
            // //前端测试
        }
    });
    function edit(e) {
        show('编辑');
        curELE = e.parentNode.parentNode;
        curID = Number(curELE.getAttribute("data-id"));
        document.getElementById("tit").value = curELE.getAttribute("data-tit");
        document.getElementById("det").value = curELE.getAttribute("data-det");
    }






//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("announcement_li").className += " active";
});

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

function send() {
    var _tit = $("#tit").val();
    var _det = $("#det").val();
    $.ajax({
                url: "/teacher/new_announcement",
                data: {
                    announcement_title: _tit,
                    announcement_message: _det
                },
                dataType: 'json',
                type: 'post',
                error:function () {
                    alert("ERROR new announcement");
                },
                success: function (response) {
                    window.location.href = response.url;
                }
            });
}

