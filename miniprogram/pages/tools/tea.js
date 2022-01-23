// pages/tools/tea.js
Page({

  /**
   * Page initial data
   */
  data: {
    tea_list: ["菊花枸杞茶","菊花决明子茶","红豆薏米茶","苦荞茶","胖大海菊花茶","玫瑰红枣茶"],
    tea: {},
    image: {}
  },

  onLoadImage: function(e){
    var $width = e.detail.width, $height=e.detail.height, ratio=$width/$height;
    console.log(e.detail)
    var viewWidth = 750, viewHeight=750/ratio;
    var image = this.data.images;
    //将图片的dataset.index作为image对象的key，然后存储图片的宽高值
    image={
      width:viewWidth,
      height:viewHeight
    }
    this.setData({
      image
    })
  },
  
  /**
  展示所选的茶的名称和图片（根据本地名称匹配云上的名称，加载云上的图片）
  */
  onTapTea: function(){
    var id = Math.floor(Math.random()*this.data.tea_list.length)
    var tea_name = this.data.tea_list[id]
    let that = this
    wx.cloud.callFunction({
      name: "searchTeaByName",
      data: {
        name: tea_name
      },
      success(res){
        console.log("请求云函数成功",res)
        console.log(res.result.data)
        that.setData({
          tea:res.result.data
        })
      },
      fail(res){
        console.log("请求云函数失败",res)
      }
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