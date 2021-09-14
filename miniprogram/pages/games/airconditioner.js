// pages/games/airconditioner.js
Page({

  /**
   * Page initial data
   */
  data: {
    modes: [
      {name:"循环风", img:"/images/循环风.png"},
      {name:"制冷", img:"/images/制冷.png"},
      {name:"制热", img:"/images/制热.png"},
      {name:"送风", img:"/images/送风.png"},
      {name:"除湿", img:"/images/除湿.png"},
      {name:"加湿", img:"/images/加湿.png"},
      {name:"清风", img:"/images/清风.png"},
      {name:"柔风", img:"/images/柔风.png"}
    ], //各种模式
    current_mode_id: 0 //默认循环风模式
  },

  //摁”模式“键切换各种模式
  onChangeMode: function(){
    this.setData({
      current_mode_id: this.data.current_mode_id < 7 ? this.data.current_mode_id + 1 : 0
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '空调小游戏'
    })
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
      })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})