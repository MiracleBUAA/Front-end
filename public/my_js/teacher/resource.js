/**
 * Created by lenovo on 2017/7/1.
 */

// CSS
setTimeout(function() {
    $("#stickyleftside").css({
        "background-color": "#424f65",
        "fontFamily": "'Helvetica Neue',Helvetica,Arial,sans-serif",
        "lineHeight": "20px",
        "fontSize": "14px"
    }, 0)
});

// 文件名——去掉路径
function getFileName(s){
     var pos=s.lastIndexOf("\\");
     return s.substring(pos+1);
}

/*
// 行对象
function getRowObj(obj){
    var i = 0;
    while(obj.tagName.toLowerCase() != "tr"){
        obj = obj.parentNode;
        if(obj.tagName.toLowerCase() == "table")return null;
    }
    return obj;
}
//根据得到的行对象得到所在的行数
function getRowNo(obj){
    var trObj = getRowObj(obj);
    var trArr = trObj.parentNode.children;
    for(var trNo= 0; trNo < trArr.length; trNo++){
        if(trObj == trObj.parentNode.children[trNo]){
            alert(trNo+1);
        }
    }
}
//删除行
function delRow(obj){
    var tr = this.getRowObj(obj);
    if(tr != null){
        tr.parentNode.removeChild(tr);
        through();
    }else{
        throw new Error("the given object is not contained by the table");
    }
}
*/

// 遍历与分类
function through() {
    var trs = document.getElementById("list").children;
    document.getElementById("am-cf").innerHTML = "共" + trs.length + "条记录";
    var opt = {};
    var all = "<option selected='selected'>所有类别</option>";
    for(var i = 0; i<trs.length; i++){
        opt[trs[i].children[2].innerHTML] = 1;
    }
    for(var i in opt){
        all += "<option>"+i+"</option>";
    }
    document.getElementById("sel").innerHTML = all;
}
through();

document.getElementById("sel").onchange=function(){
    var text = $("#sel").find("option:selected").text();
    var trs = document.getElementById("list").children;
    for(var i =0;i<trs.length; i++){
        var t = trs[i].children[2].innerHTML;
        if(text =="所有类别" || t == text){
            trs[i].style.display = "";
        }
        else{
            trs[i].style.display = "none";
        }
    }
}

// 上传文件
function show(s){
    document.getElementById("bubble").innerHTML = s;
    document.getElementById("file_flag").innerHTML = "";
    document.getElementById("pop").style.display = "block";
    document.getElementById("fade").style.display = "block";
}
function hide() {
    document.getElementById("pop").style.display = "none";
    document.getElementById("fade").style.display = "none";
}
var file_flag;
document.getElementById("bubble").onclick=function () {
    file_flag = $("#file_flag").val();
    hide();
    $("#nosee").click();
}
document.getElementById("nosee").onchange=function(){
    show("提交");
    var file_addr = this.value;
    var file_name = getFileName(file);
    var file_data = new FormData($('#file_form')[0]);

    $("#see").prop("disabled", true);

    $.ajax({
        type: "post",
        enctype: 'multipart/form-data',
        url:"http://localhost:8080/teacher/resource_upload?uid=1&course_id=1&resource_type="+file_flag+"&title="+file_name+"&file=multipart",
        data: file_data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            $("#see").prop("disabled", false);
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $("#see").prop("disabled", false);
        }
    });
}
function del(e){
    var tds = e.parentNode.parentNode.parentNode.parentNode;
    var curID = Number(tds.lastChild.innerHTML);
    $.ajax({
        type:'post',
        url:'teacher/resource_delete',
        dataType:'json',
        data:{
            resource_id:curID
        },
        error:function () {
            alert('teacher');
        },
        success:function () {
            alert('success');
        }
    });
}
