// pages/modifyinfo/modifyinfo.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: '',
        originalAvatar: '',
        avatarUrl: '',
        nickname: '',
        gender: 'male' // 默认性别为男性
    },

    // 选择图片
    chooseImage: function() {
        wx.chooseMedia({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePaths = res.tempFiles[0].tempFilePath;
                this.setData({
                    avatarUrl: tempFilePaths
                });
            },
            fail: (err) => {
                console.error("Failed to choose image: ", err);
            }
        });
    },

    // 输入昵称
    onNicknameInput(e) {
        this.setData({
            nickname: e.detail.value
        });
    },

    // 选择性别
    onGenderChange(e) {
        this.setData({
            gender: e.detail.value
        });
    },

    uploadAvatar: function(path) {
        return new Promise((resolve, reject) => {
            if (path === this.data.originalAvatar) {
                resolve(''); // 如果没有新头像，直接resolve空字符串
                return;
            }
            wx.uploadFile({
                url: 'http://localhost:9090/file/upload', // 替换为你的图片上传接口
                filePath: path,
                name: 'file',
                success: (res) => {
                    const url = res;
                    resolve(url); // 假设服务器返回图片的 URL
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    },
    async getUserInfo (openid) {
		try {
			// console.log(res.data.openid);
			let userMsg = await request('/user/get?openid=' + openid)
			console.log(userMsg);
			this.setData({
				userInfo: userMsg,
				isUserInfoEmpty: false
			})
			wx.setStorageSync('userInfo', userMsg)

		} catch(e) {
			console.log('Fail to load userInfo:', e);
        }
	},

    onSubmit: function() {
        const { avatarUrl, nickname, gender, openid } = this.data;
        let sex = gender==='male'?0:1

        if (!nickname.trim()) {
            wx.showToast({
                title: '请输入昵称',
                icon: 'none'
            });
            return;
        }

        wx.showLoading({
            title: '提交中'
        });

        this.uploadAvatar(avatarUrl).then(avatarUrl => {
            console.log(sex)
            const data = {
                openid: openid,
                nickname: nickname,
                avatar: avatarUrl.data,
                gender: sex,
            };
            console.log(data)
            request('/user/update', data, {
                'Content-Type': 'application/json'
            }, 'POST').then(response => {
                wx.hideLoading();
                wx.showToast({
                    title: '修改成功',
                    icon: 'success'
                });
                this.getUserInfo(this.data.openid).then(res => {
                    wx.switchTab({
                        url: '/pages/my/my',
                        success: (res) => {
                            const page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad(); // 刷新页面
                        }
                    })
                })

            }).catch(error => {
                wx.hideLoading();
                wx.showToast({
                    title: '修改失败',
                    icon: 'none'
                });
                console.error('修改用户信息失败', error);
            });
        }).catch(error => {
            wx.hideLoading();
            wx.showToast({
                title: '头像上传失败',
                icon: 'none'
            });
            console.error('头像上传失败', error);
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const storedUserInfo = wx.getStorageSync('userInfo');
        this.setData({
            openid: storedUserInfo.openid,
            originalAvatar: storedUserInfo.avatar,
            avatarUrl: storedUserInfo.avatar
        });
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