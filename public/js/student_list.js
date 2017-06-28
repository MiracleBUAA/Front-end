/**
 * Created by 胡晟 on 2017/6/28.
 */

//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("course_li").className += " nav-active";
    document.getElementById("student_list_li").className += " active";
});


// 点击上传按钮
// $('#upload_button').click(function () {
//     $.ajax({
//         url: '/teacher/student_list',
//         type: 'POST',
//         cache: false,
//         data: new FormData($('#upload_form')[0]),
//         processData: false,
//         contentType: false,
//
//         success : function(res) {
//             alert("上传成功！");
//         }
//
//     });
// });
