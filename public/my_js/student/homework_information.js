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


    // for (var value11 of data.values()) {
    //     console.log(value11);
    // }


    $("#upload_button").prop("disabled", true);

    var curID = Number(document.getElementById("upload_form").getAttribute("data-homework-id"));

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/student/homework_upload',
        data: {
            title: file_name,
            homework_id: curID
        },
        error: function () {
            alert("请求url错误！");
        },
        success: function (res) {
            alert(res.url);
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
                    console.log("SUCESS :", data);
                    window.location.href = "/student/homework_information";
                },
                error: function (e) {
                    console.log("ERROR :", e);
                    window.location.href = '/student/homework_information';
                }
            });
        }
    });
}
    /*
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        //url直接通到黄老板
        // url:"http://localhost:8080/admin/student_list?uid=1",
        // url: "/teacher/student_list",
        url: URL,
        data: data,
        //http://api.jquery.com/jQuery.ajax/
        //http://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            window.location.href = "/student/homework_information";

        },
        error: function (e) {

            console.log("ERROR : ", e);
            window.location.href = "/student/homework_information";
        }
    });
    */
