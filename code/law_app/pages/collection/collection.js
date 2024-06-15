// pages/collecion/collection.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,  // 当前选项卡的索引
        articles: [],
        videos: []
    },
    
    // 切换选项卡
    switchTab: function(event) {
        var index = event.currentTarget.dataset.current;
        this.setData({
            current: index
        });
    },

    // swiper切换时更新当前选项卡的索引
    swiperChange: function(event) {
        var current = event.detail.current;
        this.setData({
            current: current
        });
    },

    // 跳转到文章
    toArticle: function (event) {
        const id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../article/article?id=' + id
        })
    },

    // 跳转到视频
    toVideo: function (event) {
        const id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../video/video?id=' + id
        })
    },

	// 测试数据
	async request(url) {
		// 这里返回一个模拟数据
		return new Promise((resolve) => {
			setTimeout(() => {
			resolve({
                total : 6,
                data: [
					{id: 1, title: '文章1', image: '../../static/images/banners/1.jpg', categoryid: 1, createtime: '2024-05-12 20:45:24', views: 4},
					{id: 2, title: '文章2', image: '../../static/images/banners/2.jpg', categoryid: 2, createtime: '2024-05-11 19:30:15', views: 3},
					{id: 3, title: '文章3', image: '', categoryid: 3, createtime: '2024-05-10 18:20:10', views: 2},
					{id: 4, title: '文章4', image: '../../static/images/banners/1.jpg', categoryid: 4, createtime: '2024-05-09 17:10:05', views: 1},
					{id: 5, title: '文章5', image: '../../static/images/banners/2.jpg', categoryid: 1, createtime: '2024-05-08 16:00:00', views: 5},
					{id: 6, title: '文章6', image: '', categoryid: 2, createtime: '2024-05-07 15:00:00', views: 6}
				]});
			}, 1000);
		});
    },

	async getArticles(openid) {
        try {
            // 获取推荐记录
            let articlesRecords = await request('/collection/getas?id=' + openid);
            let articlesData = articlesRecords.data;

			let categoryMap = {
				1: '法治资讯',
				2: '普法动态',
				3: '依法治理',
				4: '法治文化'
			};
            
            // 处理 publishTime，只保留日期部分
            let articles = articlesData.map(record => {
                return {
                    ...record,
					publishTime: record.createtime.slice(0, 10), // 只保留日期部分
					category: categoryMap[record.category] // 添加 category 字段
                };
            });

            // 设置数据
            this.setData({
                articles: articles
            });
        } catch (error) {
            console.error('Failed to load articles:', error);
        }
    },
    
    async getVideos(openid) {
        try {
            // 获取视频列表
            let videosRecords = await request('/collection/getvs?id=' + openid);
            let videosData = videosRecords.data;
			let categoryMap = {
				1: '法治资讯',
				2: '普法动态',
				3: '依法治理',
				4: '法治文化'
			};
            
            // 处理 publishTime，只保留日期部分
            let videos = videosData.map(record => {
                return {
                    ...record,
					publishTime: record.createtime.slice(0, 10), // 只保留日期部分
					category: categoryMap[record.category] // 添加 category 字段
                };
            });

            // 设置数据
            this.setData({
                videos: videos
            });
        } catch (error) {
            console.error('Failed to load videos:', error);
        }   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let userInfo = wx.getStorageSync('userInfo');
        let openid = userInfo.openid;
        this.getArticles(openid);
        this.getVideos(openid);
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
        let userInfo = wx.getStorageSync('userInfo');
        let openid = userInfo.openid;
        this.getArticles(openid);
        this.getVideos(openid);
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