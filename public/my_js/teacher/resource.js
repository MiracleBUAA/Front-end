/**
 * Created by lenovo on 2017/7/1.
 */

function getFileName(s){
     var pos=s.lastIndexOf("\\");
     return s.substring(pos+1);
}

//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("resource_li").className += " active";

    $("#upload_button").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        upload();

    });
});


var URL;//文件上传URL
//表格初始化
function fnFormatDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Rendering engine:</td><td>'+aData[1]+' '+aData[4]+'</td></tr>';
    sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
    sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
    sOut += '</table>';

    return sOut;
}
function download(e) {
    var curID = Number(e.getAttribute("data-id"));
    $.ajax({
        url:'/teacher/resource_download',
        dataType:'json',
        data:{
            resource_id:curID
        },
        type:'post',
        success:function (res) {
            //alert(res.url);
            window.location.href = res.url;
        }
    });
}
var file_flag, file_name;

function upload() {

    var file_data = new FormData($('#upload_form')[0]);
    //alert("1");

    $.ajax({
        url: '/teacher/resource_upload',
        dataType: 'json',
        data: {
            resource_type: file_flag,
            title: file_name
        },
        type: 'post',

        error:function() {
            //alert('URL REQUEST ERROR');
        },
        success: function (res) {
            //alert(res.url);
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url : res.url,
                data: file_data,
                processData: false, //prevent jQuery from automatically transforming the data into a query string
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    //alert("SUCCESS : "+ data);
                    window.location.href = "/teacher/resource";
                },
                error: function (e) {
                    console.log(e);
                    //alert("ERROR : " + e);
                    window.location.href = "/teacher/resource";
                }
            });
        }
    });
}
document.getElementById("upload_file").onchange = function () {
    file_flag = $("#file_flag").val();
    file_name = getFileName(this.value);
}

$(document).ready(function() {

    $('#dynamic-table').dataTable( {
        "aaSorting": [[ 3, "desc" ]],
        "oLanguage": {
            "sSearch": "检索：",
            "sInfo": "_START_ ~ _END_ &nbsp;&nbsp;(共计_TOTAL_ 个)",
            "sLengthMenu" : "每页 _MENU_ ",
            "sZeroRecords": "没有匹配的结果",
            "sInfoEmpty": "共计 0",
            "sInfoFiltered": "",
        },
    } );
    /* 缺少触发事件
    $.ajax({
        url : '/admin/student_list',
        dataType : 'json',
        type : 'post',
        success : function (res) {
            //alert(res.url);
            URL = res.url;
        }
    })
    */


    /*
     * Insert a 'details' column to the table
     */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = '<img src="images/details_open.png">';
    nCloneTd.className = "center";

    $('#hidden-table-info thead tr').each( function () {
        this.insertBefore( nCloneTh, this.childNodes[0] );
    } );

    $('#hidden-table-info tbody tr').each( function () {
        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
    } );

    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTable = $('#hidden-table-info').dataTable( {
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": [ 0 ] }
        ],
        "aaSorting": [[1, 'asc']]
    });

    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    $(document).on('click','#hidden-table-info tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
            /* This row is already open - close it */
            this.src = "images/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "images/details_close.png";
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
        }
    } );
} );
