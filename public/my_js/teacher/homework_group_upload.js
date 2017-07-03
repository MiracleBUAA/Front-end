/**
 * Created by 12638 on 2017/7/1.
 */


//  页面侧边栏选中
$(document).ready(function () {
    document.getElementById("homework_li").className += " nav-active";
    document.getElementById("homework_list_li").className += " active";
});


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

$(document).ready(function() {

    $('#dynamic-table').dataTable( {
        "aaSorting": [[ 4, "desc" ]],
        "oLanguage": {
            "sSearch": "检索：",
            "sInfo": "_START_ ~ _END_ &nbsp;&nbsp;(共计_TOTAL_ 个)",
            "sLengthMenu" : "每页 _MENU_ ",
            "sZeroRecords": "没有匹配的结果",
            "sInfoEmpty": "共计 0",
            "sInfoFiltered": "",
        },
    } );

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
function download(e) {
    var cur_homework_id = Number(e.getAttribute("data-homework-id"));
    var cur_group_id = Number(e.getAttribute("data-group-id"));
    $.ajax({
        url:"/teacher/homework_group_upload",
        type:'get',
        dataType:"json",
        data:{
            homework_id:cur_homework_id
        },
        error:function () {
            alert("GET homework_id ERROR");
        },
        success:function (data) {
            var temp = data.group_list;
            var hwk_list;
            for(var i in temp){
                if(i.group_id == cur_group_id){
                    hwk_list = i.homework_upload_list;
                    break;
                }
            }
            for(var i in  hwk_list){
                var ID = i.homework_upload_id;

                $.ajax({
                        url: "/teacher/homework_group_download",
                        data: {
                            homework_upload_id: ID
                        },
                        type: "POST",
                        dataType: "json",
                        success: function (response) {
                            alert(response.url);
                            window.open(response.url);
                        },
                        error: function (response) {
                            alert(response.url);
                            window.open(response.url);
                        }
                });
            }
        }
    });
}
