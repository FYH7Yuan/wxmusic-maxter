// pages/search/search.js
const util = require("../../utils/util.js")
Page({
  getSearchData(e) {
    console.log(e)
    const value = e.detail.value;
    util.get('http://192.168.3.6:3000/search', {
      keywords: value
    }).then(res => {
      // console.log(res)
      let songsIdArr = []
      const songs = res.data.result.songs;
      for (let song of songs) {
        songsIdArr.push(song.id);
      }
      // this.setData({
      //   songsIdArr,
      // })
      console.log(songsIdArr)
      this.getSearchSongsArr(songsIdArr)
    })
  },
  getSearchSongsArr(songsIdArr) {
    let songIds = ''
    for (let prop in songsIdArr) {
      prop == (songsIdArr.length - 1) ? songIds += songsIdArr[songsIdArr.length - 1] : songIds += (songsIdArr[prop] + ',');
    }
    console.log(songIds)
    util.get('http://192.168.3.6:3000/song/detail', {
      ids: songIds
    }).then(res => {
      this.setData({
        songs:res.data.songs
      })
      console.log(this.data.songs)
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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