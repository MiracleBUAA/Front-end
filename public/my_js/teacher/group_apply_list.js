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

$('.accept-in').click(function () {
    $(this).parents(".panel").parent().remove();
});

function accept(e) {
    var curID = Number(e.getAttribute("data-id"));
    
    $.ajax({
        url:'/teacher/group_confirm',
        type:'post',
        dataType:'json',
        data:{
            group_apply_id:curID
        },
        error:function () {
            alert("ERROR accept");
        },
        success:function (res) {

        }
    })
}
function reject(e) {
    var curID = Number(e.getAttribute("data-id"));

    $.ajax({
        url:'/teacher/group_reject',
        type:'post',
        dataType:'json',
        data:{
            group_apply_id:curID
        },
        error:function () {
            alert("ERROR reject");
        },
        success:function () {

        }
    })
}
