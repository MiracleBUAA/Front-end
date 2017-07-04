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
