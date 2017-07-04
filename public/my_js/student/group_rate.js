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

function send(e) {
    var curID = e.getAttribute("data-id");
    var score = $("input[data-rec="+curID+"]").val();
    curID = Number(curID);
    score = Number(score)/10;

    $.ajax({
        url:'/student/group_rate',
        type:'post',
        dataType:'json',
        data:{
            student_id:curID,
            student_rate:score
        },
        error:function () {
            alert("ERROR group rate!");
        },
        success:function () {

        }
    })
}
