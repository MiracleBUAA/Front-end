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


$(document).ready(function () {

    $("#upload_button").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        fire_ajax_submit();

    });

});


function fire_ajax_submit() {

    // Get form
    var form = $('#upload_form')[0];

    var data = new FormData(form);


    // for (var value11 of data.values()) {
    //     console.log(value11);
    // }



    $("#upload_button").prop("disabled", true);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        //url直接通到黄老板
        url:"http://localhost:8080/teacher/student_list?uid=1",
        // url: "/teacher/student_list",
        data: data,
        //http://api.jquery.com/jQuery.ajax/
        //http://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {

            console.log("SUCCESS : ", data);
            $("#upload_button").prop("disabled", false);

        },
        error: function (e) {

            console.log("ERROR : ", e);
            $("#upload_button").prop("disabled", false);
        }
    });

}