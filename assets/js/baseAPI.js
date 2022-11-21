// 注意每次调用 $.get(), $.post(), $.ajax(), 调用此函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //同意为有权限的接口，设置headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局同意挂载complete回调函数
    options.complete = function (res) {
        // console.log('执行了complete回调', res) 
        if (res.responseJSON.status === 1 &&
            res.responseJSON.message === '身份认证失败') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})