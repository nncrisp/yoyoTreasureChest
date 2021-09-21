// pages/games/airconditioner.js
Page({

  /**
   * Page initial data
   */
  data: {
    modes: [
      {name:"循环风", img:"/images/air_recirculate.png", dft_tmp:25, dft_tmpf:77, max_tmp:25, min_tmp:25},
      {name:"制冷", img:"/images/air_cold.png", dft_tmp:25, dft_tmpf:77, max_tmp:33, min_tmp:9},
      {name:"制热", img:"/images/air_warm.png", dft_tmp:15.5, dft_tmpf:59.9, max_tmp:20, min_tmp:9},
      {name:"送风", img:"/images/air_wind.png", dft_tmp:25, dft_tmpf:77, max_tmp:33, min_tmp:19},
      {name:"除湿", img:"/images/air_dry.png", dft_tmp:25, dft_tmpf:77, max_tmp:33, min_tmp:17.3},
      {name:"加湿", img:"/images/air_wet.png", dft_tmp:25, dft_tmpf:77, max_tmp:33, min_tmp:17.3},
      {name:"清风", img:"/images/air_breeze.png", dft_tmp:25.1, dft_tmpf:77.2, max_tmp:33, min_tmp:13},
      {name:"柔风", img:"/images/air_softwind.png", dft_tmp:25.3, dft_tmpf:77.5, max_tmp:33, min_tmp:9}
    ], //各种模式
    current_mode_id: 0, //默认循环风模式
    tmp_precision: [1, -1, 0.1, -0.1],
    current_tmp: 25,
    current_tmpf: 77,
    isC: true, //true - 摄氏度, false - 华氏度
    canshow_sleep_wakeup: false, //默认循环风模式下不显示sleep/wakeup图标
    isShown: 0, //记录当前是否显示了sleep/wakeup图标: 0 - 当前没显示，1-当前显示sleep, 2-当前显示wakeup
    sleep_wakeup_img_src: "", //默认不显示，故sleep/wakeup image source为空。
    isAutoWind: true,
    current_wind_num: 0, //风速取值范围：0~33，其中0表示自动，1~33表示不同的档位。
    current_wind: "", //风速的字符表示形式,风速=0时不显示风速。
    sterilize: "&emsp;&emsp;", //是否开启除菌：blank placeholders - 不开启，"除菌" - 开启
    save_energy: "&emsp;&emsp;", //是否开启省电：blank placeholders - 不开启，”省电“ - 开启
    natural_wind: "&emsp;&emsp;&emsp;&emsp;", //是否开启自然风：blank placeholders - 不开启，”自然风开“
    current_wind_dir: "", //显示风向：blank - 不显示, 不为空时则为鞥想的图片路径
    heat: "&emsp;&emsp;", //显示”辅热“或不显示，默认不显示
    lock: "/images/unlock.png" //显示locked或unlocked的图片，默认为unlocked
  },

  //摁”模式“键切换各种模式
  onChangeMode: function(){
    this.setData({
      current_mode_id: this.data.current_mode_id < 7 ? this.data.current_mode_id + 1 : 0,
    })
    var id = this.data.current_mode_id
    this.setData({
      current_tmp: this.data.modes[this.data.current_mode_id].dft_tmp,
      current_tmpf: this.data.modes[this.data.current_mode_id].dft_tmpf
    })
    if (id == 0 || id == 4 || id == 5){
      this.setData({
        canshow_sleep_wakeup: false,
        isShown: 0,
        sleep_wakeup_img_src: ""
      })
    }
    else this.setData({
      canshow_sleep_wakeup: true
    })
  },

  //摁“+1度，-1度，+0.1度，-0.1度”四个键时温度产生相应变化
  onChangeTmp: function(e){
    var id = parseInt(e.currentTarget.dataset.id)
    var tmp = this.data.tmp_precision[id]
    var new_tmp = 0
    var max_tmp = 0
    var min_tmp = 0
    if (this.data.isC == true){//摄氏度
      new_tmp = parseFloat((this.data.current_tmp + tmp).toFixed(1))
      max_tmp = this.data.modes[this.data.current_mode_id].max_tmp
      min_tmp = this.data.modes[this.data.current_mode_id].min_tmp
    }
    else {//华氏度
      new_tmp = parseFloat((this.data.current_tmpf + tmp).toFixed(1))
      max_tmp = this.data.modes[this.data.current_mode_id].max_tmp*1.8+32
      min_tmp = this.data.modes[this.data.current_mode_id].min_tmp*1.8+32
    }
    if (new_tmp > max_tmp || new_tmp < min_tmp){
        new_tmp = this.data.isC == true ? this.data.current_tmp : this.data.current_tmpf
    }
    //始终保持current_tmp和current_tmpf的正确换算关系
    if (this.data.isC == true){
      this.setData({
        current_tmp: new_tmp,
        current_tmpf: new_tmp * 1.8 + 32
      })
    }
    else {
      this.setData({
        current_tmpf: new_tmp,
        current_tmp: (new_tmp - 32)/1.8
      })
    }
  },

  //摁温度单位键C/F, 切换温度单位
  onChangeUnit: function(e){
    var unit = e.currentTarget.dataset.unit
    if (unit == 'C') {
      this.setData({
        isC: true
      })
    }
    else if (unit == 'F') {
      this.setData({
        isC: false
      })
    }
    else console.log("单位错误：", unit)
  },

  //摁“睡眠”或“清醒”键，在某些特定模式下显示睡眠图标（月亮）或清醒图标（眼睛）
  onSleepOrWakeup: function(e){
    var i = e.currentTarget.dataset.i
    if (this.data.canshow_sleep_wakeup == true){
      if (i=="sleep"){
        if (this.data.isShown == 0 || this.data.isShown == 2){
          this.setData({
            isShown: 1,
            sleep_wakeup_img_src:"/images/sleep.png"
          })
        }
        else if (this.data.isShown == 1){
          this.setData({
            isShown: 0,
            sleep_wakeup_img_src: ""
          })
        }
        else {
          console.log("isShown赋值错误：",this.data.isShown)
        }
      }
      else if (i=="wakeup"){
        if (this.data.isShown == 0 || this.data.isShown == 1){
          this.setData({
            isShown: 2,
            sleep_wakeup_img_src: "/images/wakeup.png"
          })
        }
        else if (this.data.isShown == 2){
          this.setData({
            isShown: 0,
            sleep_wakeup_img_src: ""
          })
        }
        else {
          console.log("isShown赋值错误：",this.data.isShown)
        }
      }
    }
    else this.setData({
      sleep_wakeup_img_src: ""
    }) 
  },

  onChangeWind: function(){
    if(this.data.current_wind_num >=0 && this.data.current_wind_num < 33){
      this.setData({
        isAutoWind: false,
        current_wind_num: this.data.current_wind_num + 1
      })
    }
    else if(this.data.current_wind_num == 33){
      this.setData({
        isAutoWind: true,
        current_wind_num: 0
      })
    }
    else console.log("错误的风速：",this.data.current_wind)
    if(this.data.current_wind_num >= 10 && this.data.current_wind_num<=33){
      this.setData({
        current_wind:this.data.current_wind_num.toString()
      })
    }
    else if (this.data.current_wind_num > 0 && this.data.current_wind_num <=9){
      var prefix = "&nbsp;"
      this.setData({
        current_wind: prefix.concat(this.data.current_wind_num.toString())
      })
      }
      else this.setData({
        current_wind: "&nbsp;&nbsp;"
      })
},

  onSterilize: function(){
    this.setData({
      sterilize: this.data.sterilize == "&emsp;&emsp;"?"除菌":"&emsp;&emsp;"
    })
  },

  onSaveEnergy: function(){
    this.setData({
      save_energy: this.data.save_energy == "&emsp;&emsp;"?"省电":"&emsp;&emsp;"
    })
  },

  onNaturalWind: function(){
    this.setData({
      natural_wind: this.data.natural_wind == "&emsp;&emsp;&emsp;&emsp;"?"自然风开":"&emsp;&emsp;&emsp;&emsp;"
    })
  },

  onWindDirection: function(e){
    var dir = e.currentTarget.dataset.dir
    if (this.data.current_wind_dir == ""){
      this.setData({
        current_wind_dir: dir
      })
    }
    else if (this.data.current_wind_dir == dir){
      this.setData({
        current_wind_dir: ""
      })
    }
    else {
      this.setData({
        current_wind_dir: dir
      })
    }
  },
  //辅热
  onHeat: function(){
    this.setData({
      heat: this.data.heat=="&emsp;&emsp;"?"辅热":"&emsp;&emsp;"
    })
  },
  //锁定
  onLock: function(){
    this.setData({
      lock: this.data.lock == "/images/unlock.png"?"/images/lock.png":"/images/unlock.png"
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