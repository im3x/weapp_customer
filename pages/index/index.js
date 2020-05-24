// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    default_logo: 'https://txc.gtimg.com/data/153222/2020/0524/455e98415ff7c1671cfc845b47c25065.png',
    datas: [
      // 1. 消息模板
      [
        {
          id: 'text',
          name: '文本内容',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/7364fca7565e2503b0f276a0011e4be7.png',
          desc: '智能回复纯文本信息',
          keyword: '00',
        }, {
          id: 'image',
          name: '图片内容',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/850820e34115bc51d9c9a178125f75ed.png',
          desc: '智能回复预设的图片',
          keyword: '01',
        }, {
          id: 'link',
          name: '网址链接',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/46892271ca3c95cc62fed3bad2e2d92e.png',
          desc: '给用户发送网址链接',
          keyword: '02',
        }, {
          id: 'minapp',
          name: '小程序卡片',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/de19c558d21deb738282b82268865447.png',
          desc: '当前小程序的任意页面卡片',
          keyword: '03',
        }, {
          id: 'menu',
          name: '智能引导菜单',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/deb6ea7400d7127d6341d61814225614.png',
          desc: '智能引导用户点击触发关键词',
          keyword: '04',
        }, 
      ],
      // 2. 高级玩法
      [
        {
          id: 'dujitang',
          name: '毒鸡汤',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/1de7010802b344f956a38326a105c580.png',
          desc: '壮士，来一碗毒鸡汤！',
          keyword: '10',
        }, {
          id: 'image',
          name: 'Bing 图片',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/ac5f8603eac644e34edd2c2f291f85e7.png',
          desc: '每日 Bing 美图',
          keyword: '11',
        }, {
          id: 'one',
          name: '一个图文',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/8755e7befef423997021e7e2b95387d0.png',
          desc: '复杂的世界里，一个就够了！',
          keyword: '12',
        }, {
          id: 'caiyuntianqi',
          name: '彩云天气',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/5a94c5665a20cfae7624c73efd5c8130.png',
          desc: '获取当前位置的实时天气信息',
          keyword: '13',
        }, 
      ],
      // 3. 人工客服
      [
        {
          id: 'all',
          name: '通知所有客服接待',
          desc: '通知提醒所有客服，只有一个最先接待的客服进入会话',
          keyword: '20',
        }, {
          id: 'user1',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/edd06c0e048aa76038e1200d6ca3f261.jpeg',
          name: '[售前] 暖暖 MM',
          desc: '超暖、好看、敬业的售前客服，工作时间：09:00-21:00',
          keyword: '21',
        }, {
          id: 'user2',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/559ffcfb1e1fd811b2081a1ae2a288fc.jpeg',
          name: '[技术] 小鱼 GG',
          desc: '专注技术的阳光宅男，为您解决提供技术方案。08:00-22:00',
          keyword: '22',
        }, {
          id: 'user4',
          logo: 'https://txc.gtimg.com/data/153222/2020/0524/f0d0b569ef7327469feba159bf8aac3a.jpeg',
          name: '[售后] 大强 GG',
          desc: '售后技术客服大强，售后问题请找他！工作时间：00:00-23:59',
          keyword: '23',
        }
      ],
    ]
  },

  changeNav: function (e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      active: parseInt(id)
    });
  },

  loadCache: function () {
    const cache = wx.getStorageSync('datas');
    if (!cache) return;
    const new_data = JSON.parse(cache);
    if (new_data && new_data.length > 0) {
      this.setData({
        datas: new_data
      })
    }
  },

  loadData: function () {
    var local_ver = wx.getStorageSync('version');
    if (!local_ver) {
      local_ver = +new Date();
    } else {
      local_ver = parseInt(local_ver);
    }
    var API = 'https://support.qq.com/api/v1/153222/teamblog/13015?_=' + (+new Date);
    wx.request({
      url: API,
      success: res => {
        const { content, updated_at } = res.data.data;
        const new_ver = +new Date(updated_at);
        if (new_ver !== local_ver) {
          // 更新数据
          const _content = content.split('<p>')[1].split('</p>')[0];
          const new_data = JSON.parse(decodeURIComponent(_content));
          this.setData({
            datas: new_data
          });
          // 添加缓存
          wx.setStorageSync('datas', JSON.stringify(new_data));
          wx.setStorageSync('version', new_ver);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这两个是我自定义的后端数据动态更新接口，需要用到后端动态添加功能菜单的可自行修改。
    // this.loadCache();
    // this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})