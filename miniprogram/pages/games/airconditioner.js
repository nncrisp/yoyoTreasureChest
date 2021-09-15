// pages/games/airconditioner.js
Page({

  /**
   * Page initial data
   */
  data: {
    modes: [
      {name:"循环风", img:"/images/air_recirculate.png", dft_tmp:25, max_tmp:25, min_tmp:25},
      {name:"制冷", img:"/images/air_cold.png", dft_tmp:25, max_tmp:30, min_tmp:20},
      {name:"制热", img:"/images/air_warm.png", dft_tmp:15.5, max_tmp:20, min_tmp:9},
      {name:"送风", img:"/images/air_wind.png", dft_tmp:25, max_tmp:33, min_tmp:19},
      {name:"除湿", img:"/images/air_dry.png", dft_tmp:25, max_tmp:33, min_tmp:17.3},
      {name:"加湿", img:"/images/air_wet.png", dft_tmp:25, max_tmp:33, min_tmp:17.3},
      {name:"清风", img:"/images/air_breeze.png", dft_tmp:25.1, max_tmp:33, min_tmp:13},
      {name:"柔风", img:"/images/air_softwind.png", dft_tmp:25.3, max_tmp:33, min_tmp:9}
    ], //各种模式
    current_mode_id: 0, //默认循环风模式
    tmp_precision: [1, -1, 0.1, -0.1],
    current_tmp: 25
  },

  //摁”模式“键切换各种模式
  onChangeMode: function(){
    this.setData({
      current_mode_id: this.data.current_mode_id < 7 ? this.data.current_mode_id + 1 : 0,
    })
    this.setData({
      current_tmp: this.data.modes[this.data.current_mode_id].dft_tmp
    })
  },

  //摁“+1度，-1度，+0.1度，-0.1度”四个键时温度产生相应变化
  onChangeTmp: function(e){
    var id = parseInt(e.currentTarget.dataset.id)
    var tmp = this.data.tmp_precision[id]
    var new_tmp = parseFloat((this.data.current_tmp + tmp).toFixed(1))
    //console.log("current tmp ",this.data.current_tmp," tmp ",tmp," new_tmp",new_tmp)
    if (new_tmp > this.data.modes[this.data.current_mode_id].max_tmp || new_tmp < this.data.modes[this.data.current_mode_id].min_tmp){
      new_tmp = this.data.current_tmp
    }
    this.setData({
      current_tmp: new_tmp
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