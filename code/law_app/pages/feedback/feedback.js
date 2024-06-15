// pages/feedback/feedback.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedImagePath: '', // 选中的图片路径
        feedbackContent: ''
    },
    
    chooseMedia: function() {
        const that = this;
        wx.chooseMedia({
            count: 1, // 最多选择1张图片
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                const tempFilePath = res.tempFiles[0].tempFilePath;
                that.setData({
                    selectedImagePath: tempFilePath // 将选择的图片路径添加到变量中
                });
            }
        })
    },

    uploadImage: function(path) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: 'http://localhost:9090/file/upload', // 替换为你的图片上传接口
                filePath: path,
                name: 'file',
                success: (res) => {
                    const data = res;
                    resolve(data); // 假设服务器返回图片的 URL
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    },

    handleInputChange(event) {
        this.setData({
            feedbackContent: event.detail.value.trim()
        })
    },

    submitFeedback: function() {
        const userInfo = wx.getStorageSync('userInfo');

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2500
            });
            return;
        }
        const { feedbackContent, selectedImagePath } = this.data;

        if (!feedbackContent.trim()) {
            wx.showToast({
                title: '请输入反馈内容',
                icon: 'none'
            });
            return;
        }

        wx.showLoading({
            title: '提交中'
        });

        this.uploadImage(selectedImagePath).then(imageUrl => {
            const data = {
                userid: userInfo.openid,
                content: feedbackContent,
                image: imageUrl.data
            };
            console.log(data)
            request('/feedback/insert', data, {
                'Content-Type': 'application/json'
            }, 'POST').then(response => {
                wx.hideLoading();
                wx.showToast({
                    title: '提交成功',
                    icon: 'success'
                });
                // 重置表单
                this.setData({
                    feedbackContent: '',
                    selectedImagePath: ''
                });
            }).catch(error => {
                wx.hideLoading();
                wx.showToast({
                    title: '提交失败',
                    icon: 'none'
                });
                console.error('提交反馈失败', error);
            });
        }).catch(error => {
            wx.hideLoading();
            wx.showToast({
                title: '图片上传失败',
                icon: 'none'
            });
            console.error('图片上传失败', error);
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})