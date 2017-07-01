/**
 * Created by lenovo on 2017/7/1.
 */

/**
 * Created by lenovo on 2017/7/1.
 */
var curID;

function show(s){
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
    var _year = parseInt($("#course_year").val()); // int
    var _name = $("#course_name").val();
    var _time = $("#course_start_time").val();
    var _hour = $("#course_hour").val();
    var _location = $("#course_location").val();
    var _credit = $("#course_credit").val();
    var _info = $("#teacher_information").val();
    if(document.getElementById("bubble").innerHTML == "提交") {
        $.ajax({
            url: "/admin/new_course",
            data: {
                uid: 1,
                course_year: _year,
                course_name: _name,
                course_start_time: _time,
                course_hour: _hour,
                course_location: _location,
                course_credit: _credit,
                teacher_information: _info
            },
            dataType: 'json',
            type: 'post',
            error:function () {
                alert("error");
            },
            success: function (res) {
                // var x = document.createElement("tr");
                // var tot = document.getElementById("term").children.length;
                // x.innerHTML = "<td>"+_year+"</td>"+
                //     "<td>" + _name + "</td>"+
                //     "<td style='color: green'>进行中</td>"+
                //     "<td><button type='button' onclick='edit(this)' class='btn btn-info'><span class='glyphicon glyphicon-edit'></span><i>&nbsp;编辑信息</i></button></td>"+
                //     "<td><button type='button' class='btn btn-danger' onclick='end_course(this)'><span class='glyphicon glyphicon-stop'></span><i>&nbsp;结束学期</i></button></td>"+
                //     "<td><button type = 'button' class = 'btn btn-success' onclick='goto_list(this)'><span class = 'glyphicon glyphicon-download'></span><i>&nbsp;上传学生名单</i></button></td>"+
                //     "<td style='display: none'>" + tot + "</td>";
                // document.getElementById("term").insertBefore(x, document.getElementById("term").children[0]);
                // console.log(res.url);
                window.location.href = res.url;
            }
        });
        // // 前端测试
        // var x = document.createElement("tr");
        // var tot = document.getElementById("term").children.length;
        // x.innerHTML = "<td style='display: none'>" + tot + "</td><td>" + _name + "</td><td>进行中</td></tr><td><button type='button' onclick='edit(this)' class='btn btn-info'><span class='glyphicon glyphicon-edit'></span><i>&nbsp;编辑信息</i></button></td><td><button type='button' class='btn btn-danger' onclick='end_course(this)'><span class='glyphicon glyphicon-stop'></span><i>&nbsp;结束学期</i></button></td><td><button type = 'button' class = 'btn btn-success' onclick='goto_list(this)'><span class = 'glyphicon glyphicon-download'></span><i>&nbsp;上传学生名单</i></button></td>";
        // document.getElementById("term").insertBefore(x, document.getElementById("term").children[0]);
        // //
    }else{
        $.ajax({
            url: "/admin/course_update",
            data: {
                course_year: _year,
                course_name: _name,
                course_start_time: _time,
                course_hour: _hour,
                course_location: _location,
                course_credit: _credit,
                teacher_information: _info
            },
            dataType: 'json',
            type: 'post',
            error:function () {
                alert('error');
            },
            success: function (res) {
                // var bo = document.getElementById("term");
                // for(var i=0; i<bo.children.length; i++){
                //     if(bo.childNodes[i].childNodes[0].innerHTML == curID){
                //         bo.childNodes[i].childNodes[1].innerHTML = _name;
                //     }
                // }
                window.location.href = res.url;
            }
        });
        // 前端测试
        // var bo = document.getElementById("term");
        // for(var i=0; i<bo.children.length; i++){
        //     if(bo.childNodes[i].childNodes[0].innerHTML == curID){
        //         bo.childNodes[i].childNodes[1].innerHTML = _name;
        //     }
        // }
        //
    }
});
function edit(e) {
    show('编辑');
    document.getElementById("course_year").value = "";
    document.getElementById("course_start_time").value = "";
    document.getElementById("course_hour").value = "";
    document.getElementById("course_location").value = "";
    document.getElementById("course_credit").value = "";
    document.getElementById("teacher_information").value = "";
    document.getElementById("course_year").value = "";
    curID = document.getElementById("course_year").value = e.parentNode.parentNode.children[0].innerHTML;
}
function end_course(e){
    $.ajax({
        url: '/admin/course_end',
        // data: {
        //     uid: "1",
        //     course_id: e.parentNode.parentNode.children[0].innerHTML
        // },
        type: 'GET',
        dataType: 'json',
        error:function () {
            alert('error');
        },
        success: function (res) {
            window.location.href = res.url;
        }
    });
    // // 前端测试
    // e.parentNode.parentNode.children[2].style.color = 'red';
    // e.parentNode.parentNode.children[2].innerHTML = "已结束";
    // e.parentNode.parentNode.children[3].children[0].disabled = true;
    // e.parentNode.parentNode.children[4].children[0].disabled = true;
    // e.parentNode.parentNode.children[5].children[0].disabled = true;
}
function goto_list(e) {
    var ID = e.parentNode.parentNode.children[0].innerHTML;
    window.location = 'teacher/student_list';
}
