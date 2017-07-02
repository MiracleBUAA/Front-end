/**
 * Created by lenovo on 2017/6/28.
 */
$(document).ready(function () {

    var x;
    var path = '/teacher/course_info';

    // 7
    $('#team_limit_information').editable({
        type: 'text',
        pk: 1,
        title: "编辑",
        url: function (para) {
            x = para.value;
            return $.post(path, {
                    course_id: "1",
                    course_name: $('#course_name').text(),
                    course_start_time: $('#course_start_time').text(),
                    course_end_time: $('#course_end_time').text(),
                    course_hours: $('#course_hours').text(),
                    credit: $('#credit').text(),
                    course_location: $('#course_location').text(),
                    team_limit_information: x,
                    teacher_information: $('#teacher_information').text(),
                    course_information: $('#course_information').text()
                }
            );
        },
        validate: function (value) {
            value = $.trim(value);
            if (!value) {
                alert('不能为空！');
            }
        },
        success: function (response) {
            if (response == false) {
                alert('Remote error!');
            }
            else
                $('#team_limit_information').html(x);
        },
        error: function (response) {
            alert('Fail to submit!');
        }
    });
    // 8
    $('#teacher_information').editable({
        type: 'text',
        pk: 1,
        title: "编辑",
        url: function (para) {
            x = para.value;
            return $.post(path, {
                    course_id: "1",
                    course_name: $('#course_name').text(),
                    course_start_time: $('#course_start_time').text(),
                    course_end_time: $('#course_end_time').text(),
                    course_hours: $('#course_hours').text(),
                    credit: $('#credit').text(),
                    course_location: $('#course_location').text(),
                    team_limit_information: $('#team_limit_information').text(),
                    teacher_information: x,
                    course_information: $('#course_information').text()
                }
            );
        },
        validate: function (value) {
            value = $.trim(value);
            if (!value) {
                alert('不能为空！');
            }
        },
        success: function (response) {
            if (response == false) {
                alert('Remote error!');
            }
            else
                $('#teacher_information').html(x);
        },
        error: function (response) {
            alert('Fail to submit!');
        }
    });
    // 9
    $('#course_information').editable({
        type: 'text',
        pk: 1,
        title: "编辑",
        url: function (para) {
            x = para.value;
            return $.post(path, {
                    course_id: "1",
                    course_name: $('#course_name').text(),
                    course_start_time: $('#course_start_time').text(),
                    course_end_time: $('#course_end_time').text(),
                    course_hours: $('#course_hours').text(),
                    credit: $('#credit').text(),
                    course_location: $('#course_location').text(),
                    team_limit_information: $('#team_limit_information').text(),
                    teacher_information: $('#teacher_information').text(),
                    course_information: x
                }
            );
        },
        validate: function (value) {
            value = $.trim(value);
            if (!value) {
                alert('不能为空！');
            }
        },
        success: function (response) {
            if (response == false) {
                alert('Remote error!');
            }
            else
                $('#course_information').html(x);
        },
        error: function (response) {
            alert('Fail to submit!');
        }
    });
});






//  页面侧边栏选中 by 胡晟
$(document).ready(function () {
    document.getElementById("course_li").className += " nav-active";
    document.getElementById("course_info_li").className += " active";
});
