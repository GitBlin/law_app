// pages/my/my.js
import request from '../../utils/request'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
		isUserInfoEmpty: true
	},

	toModifyInfo: function () {
		wx.navigateTo({
			url: '../modifyinfo/modifyinfo'
		})
	},

	toFeedback: function () {
		wx.navigateTo({
			url: '../feedback/feedback'
		})
	},

	toCollection: function () {
		wx.navigateTo({
			url: '../collection/collection'
		})
	},

	toFavorite: function () {
		wx.navigateTo({
			url: '../favorite/favorite'
		})
	},

	toGuide: function () {
		wx.navigateTo({
			url: '../guide/guide'
		})
	},

	// 检查 userInfo 是否为空
	checkUserInfo: function () {
		const userInfo = this.data.userInfo;
		const isEmpty = Object.keys(userInfo).length === 0 && userInfo.constructor === Object;
		this.setData({
			isUserInfoEmpty: isEmpty
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

	getUserProfile (e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserInfo({
			//成功后会返回
			success: (res) => {
				console.log(res);
				// 把你的用户信息存到一个变量中方便下面使用
				let userInfo = res.userInfo
				//获取openId（需要code来换取）这是用户的唯一标识符
				// 获取code值
				wx.login({
					//成功放回
					success: (res) => {
						console.log(res);
						let code = res.code

						// 通过code换取openId
						const appid = 'wx20304b19e60f9ee5';
						//小程序的secret
						const secret = '9a9f05f76d788bb8c7526d3d81286d3f';
						console.log("code=====" + code);

						wx.request({
							url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx20304b19e60f9ee5&secret=9a9f05f76d788bb8c7526d3d81286d3f&js_code=${code}&grant_type=authorization_code`,
							success: (res) => {
								console.log(res);
								userInfo.openid = res.data.openid
								console.log("userInfo.openid=====" + userInfo.openid);

								this.getUserInfo(userInfo.openid)

								wx.showToast({ //显示登录成功信息
									title: '登陆成功',
									icon: 'success',
									duration: 2500
								})
							}
						})
					}
				})
			}
		})
	},

	clearUserInfo: function () {
		this.setData({
			userInfo: {},
			isUserInfoEmpty: true
		})
	},

	// 退出登录
	loginOut: function () {
		wx.showModal({
			title: '提示',
			content: '您确定要退出登录吗',
			success: (res) => {
				if (res.confirm) { //这里是点击了确定以后
					console.log('用户点击确定')
					wx.setStorageSync('userInfo', ''); //将token置空
					this.clearUserInfo();
					wx.redirectTo({
						url: '/pages/my/my', //跳去登录页
					})
				} else { //这里是点击了取消以后
					console.log('用户点击取消')
				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const storedUserInfo = wx.getStorageSync('userInfo');
		console.log(storedUserInfo);
		if (storedUserInfo) {
			this.setData({
				userInfo: storedUserInfo
			});
		}
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
		
		// 页面显示时的逻辑
		const storedUserInfo = wx.getStorageSync('userInfo');
		const isUserInfoEmpty = this.checkUserInfo()
		if (storedUserInfo) {
			this.setData({
				userInfo: storedUserInfo,
				isUserInfoEmpty: isUserInfoEmpty
			});
		}
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