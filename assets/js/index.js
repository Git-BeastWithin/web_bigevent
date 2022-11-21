$(function () {
    // 获取用户基本信息
    getUserInfo()

    let layer = layui.layer

    $('#btnLogout').click(function () {
        // 提示是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok')
            //退出登录操作
            // 1.清空本地存储token
            localStorage.removeItem('token')
            // 2.跳转到登录页
            location.href = './login.html'

            // 关闭confirm询问框
            layer.close(index);
        });
    })
});

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    //获取用户名称
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)

    //获取用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

