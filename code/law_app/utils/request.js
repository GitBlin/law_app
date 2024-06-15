// 发送ajax请求

/**
 * 1. 封装功能函数
 *      1. 功能点明确
 *      2. 函数内部应该保留固定代码（静态）
 *      3. 将动态的数据抽取成形参，由使用者根据自身情况动态地传入参数
 *      4. 一个良好的功能函数应该设置形参的默认值（ES6的形参默认值）
 */

import config from './config'

export default (url, data = {}, header = {
    'Content-Type': 'application/x-www-form-urlencoded'
}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        wx.request({
            url: config.host + url,
            data,
            header,
            method,
            success: (res) => {
                // console.log('请求成功', res);
                // resolve修改promise状态为成功状态resolved
                resolve(res.data);
            },
            fail: (err) => {
                // console.log('请求失败', err);
                // reject修改promise状态为失败状态rejected
                reject(err);
            }
        })
    })
}