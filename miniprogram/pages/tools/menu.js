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
    selected_style: [],
    selected_meal: [],
    showResult: false, //是否展示菜谱名称
    menus: []
  },

  checkStyle(e){
    console.log("selected styles: ", e.detail.value)
    const styles = this.data.styles
    const values = e.detail.value
    const selected_style = []
    let k = 0
    for (let i = 0, lenI = styles.length; i < lenI; ++i) {
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (styles[i].name === values[j]) {
          styles[i].status = true
          selected_style[k]=styles[i].name
          k++
          break
        }
      }
    }
    this.setData({
      styles,
      selected_style
    })
    console.log(styles)
    console.log(selected_style)
  },

  checkMeal(e){
    console.log("selected meals: ", e.detail.value)
    const meals = this.data.meals
    const values = e.detail.value
    const selected_meal = []
    let k = 0
    for (let i=0, lenI=meals.length; i<lenI; ++i){
      for (let j=0, lenJ=values.length;j<lenJ;++j){
        if(meals[i].name === values[j]){
          meals[i].status = true
          selected_meal[k] = meals[i].name
          break
        }
      }
    }
    this.setData({
      meals,
      selected_meal
    })
    console.log(meals)
    console.log(selected_meal)
  },

  getData(){
    let that = this
    wx.cloud.callFunction({
      name: 'searchByStyleMeal',
      data:{
        style: this.data.selected_style,
        meal: this.data.selected_meal
      },
      success(res){
        console.log("请求云函数成功",res)
        that.setData({
          menus: res.result.data
        })},
        fail(res){
          console.log("请求云函数失败",res)
        }
    })
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
    wx.setNavigationBarTitle({
      title: 'YOYO私房菜'
    })
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