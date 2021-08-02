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
    showRecipeDetail: false, //是否展示具体的菜谱内容
    menus: [],
    recipe_detail: []
  },

  checkStyle(e){
    //console.log("selected styles: ", e.detail.value)
    const styles = this.data.styles
    const values = e.detail.value
    const selected_style = []
    let k = 0
    for (let i = 0, lenI = styles.length; i < lenI; ++i) {
      styles[i].status=false
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
    //console.log(styles)
    //console.log(selected_style)
  },

  checkMeal(e){
    //console.log("selected meals: ", e.detail.value)
    const meals = this.data.meals
    const values = e.detail.value
    const selected_meal = []
    let k = 0
    for (let i=0, lenI=meals.length; i<lenI; ++i){
      meals[i].status = false
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
    //console.log(meals)
    //console.log(selected_meal)
  },

  getData(){
    let that = this
    wx.cloud.callFunction({
      name: "searchByStyleMeal",
      data:{
        style: this.data.selected_style,
        meal: this.data.selected_meal
      },
      success(res){
        console.log("请求云函数成功",res)
        that.setData({
          menus: res.result.data
        })
        },
        fail(res){
          console.log("请求云函数失败",res)
        }
    })
  },

  resetData(){
    const meals = this.data.meals
    const styles = this.data.styles
    const selected_meal = []
    const selected_style = []
    const menus = []
    for (let i=0, lenI=meals.length;i<lenI;i++){
      meals[i].status = false
    }
    for (let i=0, lenI=styles.length; i<lenI;i++){
      styles[i].status = false
    }
    this.setData({
      meals,
      styles,
      selected_meal,
      selected_style,
      menus
    })
    //console.log("meals: ", meals)
    //console.log("styles: ", styles)
    //console.log("selected_meal: ", selected_meal)
    //console.log("selected_style: ", selected_style)
    //console.log("menus", menus)
  },

  showRecipe(e){
    //console.log("show recipe: ", e.currentTarget.dataset._id)
    this.setData({
      showRecipeDetail: true
    })
    let that = this
    wx.cloud.callFunction({
      name: "searchById",
      data: {
        _id: e.currentTarget.dataset._id
      },
      success(res){
        console.log("请求云函数成功",res)
        that.setData({
          recipe_detail: res.result.data
        })
        //console.log("recipe detail: ", that.data.recipe_detail)
        //console.log("recipe name: ", that.data.recipe_detail[0].name)
        //console.log("recipe recipe: ", that.data.recipe_detail[0].recipe)
        },
        fail(res){
          console.log("请求云函数失败",res)
        }
    })
  },

  showMenu(){
    this.setData({
      showRecipeDetail: false,
      recipe_detail: []
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad:function() {
    wx.setNavigationBarTitle({
      title: 'YOYO私房菜'
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