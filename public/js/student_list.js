/**
 * Created by 胡晟 on 2017/6/28.
 */

//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("course_info").className += " nav-active";
    document.getElementById("student_list").className += " active";
})
// 点击上传按钮
$(document).ready(function(){
    $("#upload_button").on("click",function(){
        console.log("111");
        var oFiles = document.querySelector("#upload_file").files;
        var formData = new FormData();

        for (var i = 0, file; file = oFiles[i]; i++) {
            formData.append(file.name, file);
        }

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "/teacher/student_list", true);
        // 发送表单数据
        xhr.send(formData);

    });
});