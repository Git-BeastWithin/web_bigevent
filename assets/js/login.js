$(function () {
    // 点击去注册账号
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录账号
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
});

let form = layui.form
let layer = layui.layer

// layui自定义表单验证
form.verify({
    pwd: [
        /^[\S]{6,12}$/,
        '密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码是否一致
    repwd: function (value) {
        let pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致！'
        }
    }
})

// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    // 发起Ajax POST请求
    $.post(
        '/api/reguser',
        {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        },
        function (res) {
            if (res.status !== 0) {
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            // console.log('注册成功')
            layer.msg('注册成功，请登录!')
            //跳转到登录界面
            $('#link_login').click()
        }
    )
})

//监听登录表单的提交事件
$('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url: 'http://api-breakingnews-web.itheima.net/api/login',
        method: 'POST',
        //快速获取表单中的数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')

            // console.log(res.token)
            //将登陆成功的token字符串，曹村到localStirage中
            localStorage.setItem('token', res.token)
            //跳转到后台主页
            location.href = '/index/html'
        }
    })
})