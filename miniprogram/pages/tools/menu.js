// pages/tools/menu.js
Page({

  /**
   * Page initial data
   */
  data: {
    styles: [
      {name:"荤菜", status: false},
      {name:"素菜", status: false},
      {name:"主食", status: false},
      {name:"酒水", status: false}
    ],
    meals: [
      {name:"早餐", status: false},
      {name:"午餐", status: false},
      {name:"晚餐", status: false},
      {name:"节日餐", status: false}
    ],
    showResult: false, //是否展示菜谱名称
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad:function() {
    wx.setNavigationBarTitle({
      title: 'YOYO私房菜'
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