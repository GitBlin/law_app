// pages/home/home.js
import request from '../../utils/request'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		banners: [],
		recommendations: []
	},

	// 跳转到搜索页面
	toSearch: function () {
		wx.navigateTo({
			url: '../search/search'
		})
	},

	toStudy: function(event) {
        const category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: '../study/study?category=' + category
        });
	},
	
	toArticle: function(event) {
		const id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../article/article?id=' + id
        });
	},

	/*-- 测试数据begin --*/
	async request(url) {
		// 这里返回一个模拟数据
		return new Promise((resolve) => {
			setTimeout(() => {
			resolve([
					{id: 3, title: '文章3', image: '', categoryid: 3, createtime: '2024-05-10 18:20:10', views: 2},
					{id: 6, title: '文章6', image: '', categoryid: 2, createtime: '2024-05-07 15:00:00', views: 6},
					{id: 1, title: '文章1', image: '../../static/images/banners/1.jpg', categoryid: 1, createtime: '2024-05-12 20:45:24', views: 4},
					{id: 2, title: '文章2', image: '../../static/images/banners/2.jpg', categoryid: 2, createtime: '2024-05-11 19:30:15', views: 3},
					{id: 4, title: '文章4', image: '../../static/images/banners/1.jpg', categoryid: 4, createtime: '2024-05-09 17:10:05', views: 1},
					{id: 5, title: '文章5', image: '../../static/images/banners/2.jpg', categoryid: 1, createtime: '2024-05-08 16:00:00', views: 5}
				]);
			}, 1000);
		});
	},
	/*-- 测试数据end --*/

	async getBanners() {
		try {
			let bannersRecords = await request('/banner/getall')

			let banners = bannersRecords.slice(-4)

			this.setData({
				banners: banners
			})
		} catch(error) {
			console.error('Failed to load banners:', error)
		}
	},

	async getRecommendations() {
        try {
            // 获取推荐记录
            let recommendationsRecords = await request('/article/getall');

			let categoryMap = {
				1: '法治资讯',
				2: '普法动态',
				3: '依法治理',
				4: '法治文化'
			};
            
            // 处理 publishTime，只保留日期部分，并取后五项（考虑到可能少于五项的情况）
            let recommendations = recommendationsRecords.slice(-5).map(record => {
                return {
                    ...record,
					publishTime: record.createtime.slice(0, 10), // 只保留日期部分
					category: categoryMap[record.category] // 添加 category 字段
                };
            });

            // 设置数据
            this.setData({
                recommendations: recommendations
            });
        } catch (error) {
            console.error('Failed to load recommendations:', error);
        }
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getRecommendations()
		this.getBanners()
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
		this.getRecommendations()
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