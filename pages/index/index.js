const app = getApp().globalData
const util = require("../../utils/util.js")
Page({
  init() {

    this.getSongSheet();
    this.getSwiperData();
    this.recommendNewMusic();
    app.mySheet = [];
    app.mySheetIdArr = [];
  },
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  addSongs(e) {
    console.log(e)
    let song = e.currentTarget.dataset.song;
    const songId = song.id;
    for (let id of app.mySheetIdArr) {
      if (id === songId) {
        wx.showToast({
          title: '歌曲已经在歌单里了~',
          icon: 'none'
        })
        return
      }
    }
    app.mysheet = Object.assign([], app.mySheet.push(song));
    app.mySheetIdArr.push(song.id)
    wx.showToast({
      title: `添加成功`,
      icon: 'none'
    })
    console.log(app.mySheet)
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    songlist: [],
    flag: false,
    songSheetList: [],
  },
  toSongList(e) {
    const that = this;
    const index = e.currentTarget.dataset.sheetindex;
    wx.setStorage({
      key: "sheetData",
      data: JSON.stringify(that.data.songSheetList[index])
    })
    wx.navigateTo({
      url: `../songlist/songlist?index=${index}`,
    })
  },
  getSwiperData() {
    util.get('http://192.168.3.6:3000/banner', {
      type: 2
    }).then(res => {
      // console.log(res)
      this.setData({
        swiper: res.data.banners
      })
    })
  },
  getSongSheet() {
    util.get('http://192.168.3.6:3000/top/playlist/highquality', {
      cat: '流行',
      limit: 10
    }).then(res => {
      console.log(res)
      let playCountArr = []
      const songSheetList = res.data.playlists;
      for (let sheet of songSheetList) {
        playCountArr.push(util.formatPlayedCount(sheet.playCount))
      }
      this.setData({
        songSheetList,
        playCountArr,
        flag: true
      })
      // console.log(_that.data.songSheetList)
    })
  },
  recommendNewMusic() {
    util.get('http://192.168.3.6:3000/personalized/newsong').then(res => {
      // console.log(res)
      const songs = res.data.result;
      let songIds = ''
      for (let prop in songs) {
        prop == (songs.length - 1) ? songIds += songs[8].id : songIds += (songs[prop].id + ',');
      }
      console.log(songIds)
      util.get('http://192.168.3.6:3000/song/detail', {
        ids: songIds
      }).then(res => {
        console.log(res)
        let recommondSongsList = [
          [],
          [],
          []
        ]
        const newSongs = res.data.songs;
        console.log(newSongs)
        for (let song in newSongs) {
          if (song < 3) {
            recommondSongsList[0].push(newSongs[song])
          } else if (song >= 3 && song < 6) {
            recommondSongsList[1].push(newSongs[song])
          } else if (song >= 6 && song < 9) {
            recommondSongsList[2].push(newSongs[song])
          }

        }
        this.setData({
          recommondSongsList
        })
        console.log(this.data.recommondSongsList)
      })

      // console.log(this.data.recommondSongsList)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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