// 注意每次调用 $.get(), $.post(), $.ajax(), 调用此函数
$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})