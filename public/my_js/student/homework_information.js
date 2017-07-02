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

}