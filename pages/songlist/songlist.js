const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    sheetData: [],
    songList: [],
    scrollTop: 0
  },
  onPageScroll: function(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  getSonglist() {
    const sheetId = this.data.sheetData.id;
    const that = this
    util.get('http://192.168.3.6:3000/playlist/detail', {
      id: sheetId
    }).then(res => {
      console.log(res)
      that.setData({
        songList: res.data.playlist.tracks
      })
      // console.log(that.data.songList)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    wx.getStorage({
      key: 'sheetData',
      success(res) {
        that.setData({
          index: options.index,
          sheetData: JSON.parse(res.data)
        })
        wx.setNavigationBarTitle({
          title: '歌单'
        });
        that.getSonglist();
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log(this.data.index, this.data.sheetData);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})