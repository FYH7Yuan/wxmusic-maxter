const app = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    songs: Array
  },

  /**
   * 组件的初始数据
   */
  data: {},


  /**
   * 组件的方法列表
   */
  methods: {
    toPlayer(e) {
      const that = this;
      // console.log(e)
      // app.globalData.currentIndex = e.currentTarget.dataset.index;
      app.songsList = this.properties.songs;
      // console.log(app.songsList)
      wx.setStorageSync(
        "currentIndex", e.currentTarget.dataset.index
      )
      app.currentIndex = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: `/pages/player/player`,
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
      app.mysheet = Object.assign([], app.mySheet.push(e.currentTarget.dataset.song));
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
  }
})