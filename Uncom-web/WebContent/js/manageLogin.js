
var time = null;

function login(thi, data) {
  var sors;
  var sor;
  if (!$("#login_input_username").val()) {
    $("#login_input_username_div").attr("class", "input-group login_input_username_div has-error")
    $("#login_input_username").attr("placeholder", "账号不能为空")
    $("#login_input_username").focus();
    return 0;
  }
  if ($("#login_input_username").val()) {

    if ($("#login_input_username").val().indexOf('@') != -1) {
      sors = "邮箱"
      sor = "email"
      $("#login_input_username_div").attr("class", "input-group login_input_username_div has-success")
    } else {
      sors = "手机号码"
      sor = "phone"
      if ($("#login_input_username").val().length != 11) {
        $("#login_input_username").val("")
        $("#login_input_username_div").attr("class", "input-group login_input_username_div has-error")
        $("#login_input_username").attr("placeholder", "手机号码格式不正确")
        $("#login_input_username").focus();
        return 0;
      } else {
        $("#login_input_username_div").attr("class", "input-group login_input_username_div has-success")
      }
    }
  }
  if (!$("#login_input_password").val()) {
    $("#login_input_password_div").attr("class", "input-group login_input_password_div has-error")
    $("#login_input_password").attr("placeholder", "密码不能为空")
    $("#login_input_password").focus();
    return 0;
  } else {
    $("#login_input_password_div").attr("class", "input-group login_input_password_div has-success")
    clearTimeout(time);
    thi.logins = true;
    console.log('login start');
    time = setTimeout(function() {
      $.ajax({
        type: 'post',
        async: true,
        dataType: 'json',
        url: "/login",
        xhrFields: {
          withCredentials: true
        },
        data: {
          use: sor,
          username: $("#login_input_username").val(),
          password: $("#login_input_password").val()
        },
        crossDomain: true,
        success: function(date) {
          console.log(date)
          if (date == null || date.length == 0) {
            thi.logins = false;
            $("#login_input_username_div").attr("class", "input-group login_input_username_div has-error ")
            $("#login_input_password_div").attr("class", "input-group login_input_password_div has-error")
            $("#login_input_password").val("")
            $("#login_input_password").attr("placeholder", "账号或密码错误")
            $("#login_input_password").focus();

          } else {
            var username = date.username
            if (data == 0) {
              console.log("exit")
              thi.$store.commit('updateUserState', {
                userState: 1,
                userName: date.username,
                userId: date.id,
                headImageUrl: date.header_pic
              })
              thi.$store.commit('updateSocket', thi.io)
           
              
              thi.$router.push({
                path: 'main'
              })
            }
          }
        }
      })
    }, 200)
  }
}
