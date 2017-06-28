/**
 * Created by lenovo on 2017/6/28.
 */
$(document).ready(function () {

            var x;
            var path = '/teacher/course_info';
            // 1
            $('#course_name').editable({
                type: 'text',
                pk: 1,
                title: "编辑",
                url: function(para){
                    x = para.value;
                    return $.post(path, {
                        course_id: "1",
                        course_name:x,
                        course_start_time: $('#course_start_time').text(),
                        course_end_time: $('#course_end_time').text(),
                        course_hours: $('#course_hours').text(),
                        credit: $('#credit').text(),
                        course_location: $('#course_location').text(),
                        team_limit_information: $('#team_limit_information').text(),
                        teacher_information: $('#teacher_information').text(),
                        course_information: $('#course_information').text()
                      }
                    );
                },
                validate: function(value){
                    value = $.trim(value);
                    if(!value){
                        alert('不能为空！');
                    }
                },
                success:function(response){
                    if(response == false){
                        alert('Remote error!');
                    }
                    else
                        $('#course_name').html(x);
                },
                error: function(response){
                    alert('Fail to submit!');
                }
            });
            // 2
              $('#course_start_time').editable({
                  type: 'text',
                  pk: 1,
                  title: "编辑",
                  url: function (para) {
                      x = para.value;
                      return $.post(path, {
                              course_id: "1",
                              course_name: $('#course_name').text(),
                              course_start_time: x,
                              course_end_time: $('#course_end_time').text(),
                              course_hours: $('#course_hours').text(),
                              credit: $('#credit').text(),
                              course_location: $('#course_location').text(),
                              team_limit_information: $('#team_limit_information').text(),
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
                          $('#course_start_time').html(x);
                  },
                  error: function (response) {
                      alert('Fail to submit!');
                  }
              });
              // 3
              $('#course_end_time').editable({
                  type: 'text',
                  pk: 1,
                  title: "编辑",
                  url: function (para) {
                      x = para.value;
                      return $.post(path, {
                              course_id: "1",
                              course_name: $('#course_name').text(),
                              course_start_time: $('#course_start_time').text(),
                              course_end_time: x,
                              course_hours: $('#course_hours').text(),
                              credit: $('#credit').text(),
                              course_location: $('#course_location').text(),
                              team_limit_information: $('#team_limit_information').text(),
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
                          $('#course_end_time').html(x);
                  },
                  error: function (response) {
                      alert('Fail to submit!');
                  }
              });
              // 4
              $('#course_hours').editable({
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
                              course_hours: x,
                              credit: $('#credit').text(),
                              course_location: $('#course_location').text(),
                              team_limit_information: $('#team_limit_information').text(),
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
                          $('#course_hours').html(x);
                  },
                  error: function (response) {
                      alert('Fail to submit!');
                  }
              });
              // 5
              $('#credit').editable({
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
                              credit: x,
                              course_location: $('#course_location').text(),
                              team_limit_information: $('#team_limit_information').text(),
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
                          $('#credit').html(x);
                  },
                  error: function (response) {
                      alert('Fail to submit!');
                  }
              });
              // 6
              $('#course_location').editable({
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
                              course_location: x,
                              team_limit_information: $('#team_limit_information').text(),
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
                          $('#course_location').html(x);
                  },
                  error: function (response) {
                      alert('Fail to submit!');
                  }
              });
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