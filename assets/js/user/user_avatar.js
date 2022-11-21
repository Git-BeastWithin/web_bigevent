$(function () {
    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').click(function () {
        $('#file').click()
    })

    //为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        // console.log(e)
        //湖片区选择的文件
        let fileList = e.target.files
        // console.log(fileList)
        if (fileList.length === 0) {
            return layer.msg('请选择照片')
        }

        let file = fileList[0]
        let imageUrl = URL.createObjectURL(file)

        $image
            .cropper('destroy')
            .attr('src', imageUrl)
            .cropper(options)
    })

    $('#btnUpload').click(function () {
        // 拿到用户裁剪之后的头像
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })

    })
});