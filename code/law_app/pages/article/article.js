// pages/article/article.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: {},
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
                title: "梅大高速路面塌陷事故，已致36人死亡",
                content: "<p>据广东梅州大埔县委宣传部消息，5月1日凌晨2时10分许，梅大高速往福建方向K11+900m附近发生高速公路路面塌陷事故。至5月2日早上5时30分，已发现23辆车陷落，36人死亡，30人受伤（无生命危险）。</p><p>目前，广东省、梅州市选派最强医疗专家，开展多学科会诊，全力做好伤者救治。灾害处置和善后处置工作正在有序进行中</p><p>广东省委书记黄坤明：把抢救人的生命放在第一位，从全省调集精锐专业力量，抢抓黄金时间，确保不漏一处不漏一人</p><p>据《南方日报》消息，5月1日凌晨2时左右，梅大高速茶阳路段发生塌方灾害，造成多辆车辆被困和人员伤亡。灾害发生后，省市第一时间组织力量赶赴现场处置，已救出多名被困人员，抢险救援和应急处置等各项工作正在紧张进行中。接报后，广东省委书记黄坤明立即作出指示和安排，并两次召开视频调度会，视频连线救援现场，研究部署救援救治工作。广东省委副书记、省长王伟中按照省委安排即刻赶赴灾害现场，实地指挥一线应急处置工作。</p>"
                // 其他段落...
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

    async getArticle(id) {
        try {
            let article = await request('/article/getmsg?id=' + id);

            // 设置数据
            this.setData({
                article: article
            });
        } catch (error) {
            console.error('Failed to load article:', error);
        }        
    },

    async getComments(id) {
        try {
            let comments = await request('/comment/getac?id=' + id);

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

    // 判断是否是喜爱列表的文章
    async checkIsFavorite(id) {
        let userInfo = wx.getStorageSync('userInfo')

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid)
            return;
        try {
            let judgeIsFavorite = await request('/favorite/judge', {
                userid: userInfo['openid'],
                id: id,
                sort: '0'
            }, {
                'Content-Type': 'application/json'
            })

            console.log('judgeIsFavorite', judgeIsFavorite)

            if (judgeIsFavorite) {
                this.setData({
                    isFavorite: true
                })
            }
        } catch(error) {
            console.log('Fail to judge isFavorite: ', error);
        }
    },

    // 判断是否是收藏列表的文章
    async checkIsCollect(id) {
        let userInfo = wx.getStorageSync('userInfo')

        // 检查用户是否已登录
        if (!userInfo || !userInfo.openid)
            return;   
        console.log(this.data.article.id);
        try {
            let judgeIsCollect = await request('/collection/judge', {
                userid: userInfo['openid'],
                id: id,
                sort: '0'
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
                    id: this.data.article['id'],
                    sort: 0
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
                    articleid: this.data.article['id'],
                    sort:0
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
                    id: this.data.article['id'],
                    sort:0
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
                    articleid: this.data.article['id'],
                    sort:0
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
                articleid: this.data.article.id,
                content: commentContent,
                sort:0
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
                this.getComments(this.data.article.id); // 重新获取评论列表
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
            const response = await request('/article/view?id=' + id);
        }  catch (error) {
            console.error('Failed to submit view:', error);
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.id) {
            // await this.getArticle(options.id);
            // await this.addOneView(options)
            // await this.getComments(options.id);
            // await this.checkIsCollect(options.id);
            // await this.checkIsFavorite();
            this.getArticle(options.id);
            this.addOneView(options.id)
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