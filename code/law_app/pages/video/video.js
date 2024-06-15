// pages/video/video.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        video: {},
        comments: [],
        isFavorite: false,
        isCollect: false,
        commentContent: ''  // 输入评论
    },

	/*-- 测试数据Begin --*/
	async request1(url) {
		// 这里返回一个模拟数据
		return new Promise((resolve) => {
			setTimeout(() => {
			resolve({
                url: "http://localhost/%e8%93%9d%e5%a4%a9%e4%b9%8b%e4%b8%8b%ef%bc%8c%e6%b3%95%e4%b9%83%e5%a4%a7%e9%81%93%e2%80%94%e2%80%94%e5%a4%a7%e5%ad%a6%e7%94%9f%e8%87%aa%e5%88%b6%e6%b3%95%e6%b2%bb%e5%ae%a3%e4%bc%a0%e7%89%87.mp4"
            });
			}, 1000);
		});
    },

    async request2(url) {
		// 这里返回一个模拟数据
		return new Promise((resolve) => {
			setTimeout(() => {
			resolve({
                total : 6,
                data: [
                    {id: 1, nickname:'wr', userid: 1, avatar: '../../static/images/banners/1.jpg', articleid: 1, content: '牛逼', createtime: '2024-05-12 20:45:24', views: 4},
                    {id: 2, nickname:'wr', userid: 1, avatar: '../../static/images/banners/1.jpg', articleid: 1, content: '牛逼', createtime: '2024-05-12 20:45:24', views: 4},
                    {id: 3, nickname:'wr', userid: 1, avatar: '../../static/images/banners/1.jpg', articleid: 1, content: '牛逼', createtime: '2024-05-12 20:45:24', views: 4},
                    {id: 4, nickname:'wr', userid: 1, avatar: '../../static/images/banners/1.jpg', articleid: 1, content: '牛逼', createtime: '2024-05-12 20:45:24', views: 4},
                    {id: 5, nickname:'wr', userid: 1, avatar: '../../static/images/banners/1.jpg', articleid: 1, content: '牛逼', createtime: '2024-05-12 20:45:24', views: 4}
				]});
			}, 1000);
		});
    },

    async request(url) {
		// 这里返回一个模拟数据
		return new Promise((resolve) => {
			setTimeout(() => {
			resolve(true);
			}, 1000);
		});
    },
    /*-- 测试数据End --*/    

    async getVideo(id) {
        try {
            let video = await request('/video/getmsg?id=' + id);
            console.log(video.url)
            console.log(video)
            // 设置数据
            this.setData({
                video: video
            });
        } catch (error) {
            console.error('Failed to load video:', error);
        }        
    },

    async getComments(id) {
        try {
            let comments = await request('/comment/getvc?id=' + id);

            // 设置数据
            this.setData({
                comments: comments.data
            });
        } catch (error) {
            console.error('Failed to load comments:', error);
        }   
    },

    // 更新输入的评论内容
    inputComment(e) {
        this.setData({
            commentContent: e.detail.value
        });
    },

    // 判断是否是喜爱列表的视频
    async checkIsFavorite(id) {
        let userInfo = wx.getStorageSync('userInfo')

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid)
            return;   
            // console.log(this.data.video.id);
        try {
            let judgeIsFavorite = await request('/favorite/judge', {
                userid: userInfo['openid'],
                id: id,
                sort:1
            }, {
                'Content-Type': 'application/json'
            })

            if (judgeIsFavorite) {
                this.setData({
                    isFavorite: true
                })
            }
        } catch(error) {
            console.log('Fail to judge isFavorite: ', error);
        }
    },

    // 判断是否是收藏列表的视频
    async checkIsCollect(id) {
        let userInfo = wx.getStorageSync('userInfo')

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid)
            return;   
        
        try {
            let judgeIsCollect = await request('/collection/judge', {
                userid: userInfo['openid'],
                id: id,
                sort: 1
            }, {
                'Content-Type': 'application/json'
            })

            if (judgeIsCollect) {
                this.setData({
                    isCollect: true
                })
            }
        } catch(error) {
            console.log('Fail to judge isCollect: ', error);
        }
    },    

    // 添加/取消喜爱
    async handleFavorite() {
        let userInfo = wx.getStorageSync('userInfo')

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2500
            });
            return;
        }

        if (this.data.isFavorite) {
            try {
                // 取消喜爱
                let cancelFavorite = await request('/favorite/delete', {
                    userid: userInfo['openid'],
                    id: this.data.video['id'],
                    sort: 1
                }, {
                    'Content-Type': 'application/json'
                })

                // 切换isFavorite属性值
                this.setData({
                    isFavorite: !this.data.isFavorite
                })

                wx.showToast({
                    title: '取消喜爱成功',
                    icon: 'success',
                    duration: 2500
                });
            } catch(error) {
                console.error('Failed to cancel favorite:', error);
                wx.showToast({
                    title: '取消喜爱失败',
                    icon: 'none',
                    duration: 2500
                });
            }
            
        } else {
            try {
                // 添加喜欢
                let addFavorite = await request('/favorite/insert', {
                    userid: userInfo['openid'],
                    videoid: this.data.video['id'],
                    sort:1
                }, {
                    'Content-Type': 'application/json'
                }, 'POST')

                // 切换isFavorite属性值
                this.setData({
                    isFavorite: !this.data.isFavorite
                })

                wx.showToast({
                    title: '添加喜爱成功',
                    icon: 'success',
                    duration: 2500
                });
            } catch(error) {
                console.error('Failed to add favorite:', error);
                wx.showToast({
                    title: '添加喜爱失败',
                    icon: 'none',
                    duration: 2500
                });
            }
        }
    },

    // 添加/取消收藏
    async handleCollect() {
        let userInfo = wx.getStorageSync('userInfo')

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2500
            });
            return;
        }

        if (this.data.isCollect) {
            try {
                // 取消收藏
                let cancelCollect = await request('/collection/delete', {
                    userid: userInfo['openid'],
                    id: this.data.video['id'],
                    sort:1
                }, {
                    'Content-Type': 'application/json'
                })

                // 切换isCollect属性值
                this.setData({
                    isCollect: !this.data.isCollect
                })

                wx.showToast({
                    title: '取消收藏成功',
                    icon: 'success',
                    duration: 2500
                });
            } catch(error) {
                console.error('Failed to cancel collect:', error);
                wx.showToast({
                    title: '取消收藏失败',
                    icon: 'none',
                    duration: 2500
                });
            }
            
        } else {
            try {
                // 添加收藏
                let addCollect = await request('/collection/insert', {
                    userid: userInfo['openid'],
                    videoid: this.data.video['id'],
                    sort:1
                }, {
                    'Content-Type': 'application/json'
                }, 'POST')

                // 切换isCollect属性值
                this.setData({
                    isCollect: !this.data.isCollect
                })

                wx.showToast({
                    title: '添加收藏成功',
                    icon: 'success',
                    duration: 2500
                });
            } catch(error) {
                console.error('Failed to add collect:', error);
                wx.showToast({
                    title: '添加收藏失败',
                    icon: 'none',
                    duration: 2500
                });
            }
        }
    },

    // 处理提交评论
    async submitComment(e) {
        // 先登录才能评论
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

        const commentContent = this.data.commentContent.trim();
        if (!commentContent) {
            wx.showToast({
                title: '评论内容不能为空',
                icon: 'none',
                duration: 2500
            });
            return;
        }

        try {
            // 提交评论到服务器的逻辑
            const response = await request('/comment/insert', {
                userid: userInfo.openid,
                videoid: this.data.video.id,
                content: commentContent,
                sort:1
            }, {
                'Content-Type': 'application/json'
            }, 'POST');

            if (response) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'success',
                    duration: 2500
                });
                this.setData({
                    commentContent: ''
                });
                this.getComments(this.data.video.id); // 重新获取评论列表
            } else {
                wx.showToast({
                    title: '评论失败',
                    icon: 'error',
                    duration: 2500
                });
            }
        } catch (error) {
            console.error('Failed to submit comment:', error);
            wx.showToast({
                title: '评论提交失败',
                icon: 'none',
                duration: 2500
            });
        }
    },  
    
    async addOneView(id) {
        const userInfo = wx.getStorageSync('userInfo');

        try {
            const response = await request('/video/view?id=' + id);
        }  catch (error) {
            console.error('Failed to submit view:', error);
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */    
    onLoad(options) {
        if (options.id) {
            this.getVideo(options.id);
            this.addOneView(options.id);
            this.getComments(options.id);
            this.checkIsCollect(options.id);
            this.checkIsFavorite(options.id);
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