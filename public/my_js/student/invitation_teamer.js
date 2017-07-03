/**
 * Created by 胡晟 on 2017/7/3.
 */


// 页面侧边栏选中
$(document).ready(function () {
    document.getElementById("group_li").className += " nav-active";
    document.getElementById("invitation_li").className += " active";
});


$('.reject-in').click(function () {
    $(this).parents(".panel").parent().remove();
});

function accept(e) {
    var cur_sender_id = Number(e.getAttribute("data-sender-id"));
    alert(cur_sender_id);
    $.ajax({
        url:"/student/accept_invitation",
        type:'post',
        dataType:'json',
        data:{
            sender_id:cur_sender_id
        },
        error:function () {
            alert('ERROR accept');
        },
        success:function () {
            window.location = '/student/mygroup';
        }
    })
}

function reject(e) {
    var cur_sender_id = Number(e.getAttribute("data-sender-id"));
    alert(cur_sender_id);
    $.ajax({
        url:"/student/reject_invitation",
        type:'post',
        dataType:'json',
        data:{
            sender_id:cur_sender_id
        },
        error:function () {
            alert('ERROR reject');
        },
        success:function () {

        }
    })
}
