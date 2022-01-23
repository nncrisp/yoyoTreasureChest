// pages/tools/tea.js
Page({

  /**
   * Page initial data
   */
  data: {
    tea_list: ["菊花枸杞茶","菊花决明子茶","红豆薏米茶","苦荞茶","菊花胖大海茶","玫瑰红枣茶"],
    tea: ""
  },

  onTapTea: function(){
    var id = Math.floor(Math.random()*this.data.tea_list.length)
    var tea = this.data.tea_list[id]
    this.setData({
      tea
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '今天喝啥茶？'
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