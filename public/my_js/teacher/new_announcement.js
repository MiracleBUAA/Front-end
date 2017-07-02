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
        var _tit = $("#tit").val();
        var _det = $("#det").val();
        if(document.getElementById("bubble").innerHTML == "提交") {
            $.ajax({
                url: "/teacher/new_announcement",
                data: {
                    uid: 1,
                    announcement_id:1,
                    announcement_title: _tit,
                    announcement_message: _det
                },
                dataType: 'json',
                type: 'post',
                error:function () {
                    alert("error");
                },
                success: function (res) {
                    var x = document.createElement("tr");
                    var tot = document.getElementById("term").children.length;
                    x.innerHTML = "<td>"+tot+"</td>"+
                                    "<td><div class='alert alert-block alert-danger fade in'><button type='button' data-dismiss='alert' class='close close-sm'><i class='fa fa-times'></i></button><strong>"+_tit+"&nbsp;</strong>"+_det+"</div></td>"+
                                    "<td><button type='button' onclick='edit(this)' class='btn btn-info' style='margin-top: 10px;'><span class='glyphicon glyphicon-edit'></span><i>编辑信息</i></button></td><td style='padding-top: 24px;color:red;'></td>";
                    document.getElementById("term").insertBefore(x, document.getElementById("term").children[0]);
                }
            });
            // 前端测试

                    var x = document.createElement("tr");
                    var tot = document.getElementById("term").children.length;
                    x.innerHTML = "<td style='display: none;'>"+tot+"</td>"+
                                    "<td><div class='alert alert-block alert-danger fade in'><button type='button' data-dismiss='alert' class='close close-sm'><i class='fa fa-times'></i></button><strong>"+_tit+"&nbsp;</strong>"+_det+"</div></td>"+
                                    "<td><button type='button' onclick='edit(this)' class='btn btn-info' style='margin-top: 10px;'><span class='glyphicon glyphicon-edit'></span><i>编辑信息</i></button></td><td style='padding-top: 24px;color:red;'></td>";
                    document.getElementById("term").insertBefore(x, document.getElementById("term").children[0]);
            //
        }else{
            $.ajax({
                url: "/teacher/announcement_update",
                data: {
                    uid: 1,
                    course_id:1,
                    announcement_id: 1,
                    announcement_title: _tit,
                    announcement_message: _det
                },
                dataType: 'json',
                type: 'post',
                error:function () {
                  alert('error');
                },
                success: function (res) {
                    var bo = document.getElementById("term");
                    for(var i=0; i<bo.children.length; i++){
                        if(bo.childNodes[i].childNodes[0].innerHTML == curID){
                            bo.childNodes[i].childNodes[1].innerHTML =
                            "<div class='alert alert-block alert-danger fade in'>"+
                            "<button type='button' data-dismiss='alert' class='close close-sm'>"+
                            "<i class='fa fa-times'></i></button><strong>"+_tit+"</strong> "+_det+"</div>";
                            break;
                        }
                    }
                }
            });
            // 前端测试
            var bo = document.getElementById("term");
                    for(var i=0; i<bo.children.length; i++){
                        if(bo.childNodes[i].childNodes[0].innerHTML == curID){
                            bo.childNodes[i].childNodes[1].innerHTML =
                            "<div class='alert alert-block alert-danger fade in'>"+
                            "<button type='button' data-dismiss='alert' class='close close-sm'>"+
                            "<i class='fa fa-times'></i></button><strong>"+_tit+"</strong> "+_det+"</div>";
                            break;
                        }
                    }
            //
        }
    });
    function edit(e) {
        show('编辑');
        document.getElementById("tit").value = "";
        document.getElementById("det").value = "";
        curID = e.parentNode.parentNode.children[0].innerHTML;
    }
