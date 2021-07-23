// miniprogram/pages/games/maths.js
Page({

  /**
   * Page initial data
   */
  data: {
    number: 0, //当前题目序号
    totalNum: 21, //题目总数
    question: "点Start开始", //+-×÷
    op: ["+", "-", "×", "÷"],
    result: null, //存储用户输入的结果，用于判断输入是否正确
    isCorrect: -1, // -1 hide; 1 correct; 0 wrong
    isShown: 0, //0 显示"Start"; 1 显示"Next"; 2 显示"Finish"
    focus: false, //focus on the input box
    isDisabled: true, // disable/enable the input box
    showResult: false, //是否展示答案表
    results: [], //存储正确的运算结果，用于填充"答案表"
    score: 0, //存储答题得分
    result_height: 0 //展示结果的view的高度
  },

  showActionImg: function() {
    var num = this.data.number
    var showAction = -1;
    if (num >= 0 && num < this.data.totalNum) {
      showAction = 1 //显示"Next"
    }
    else if (num >= this.data.totalNum) {
      showAction = 2 //显示"Finish"
    }
    else
      console.log("Action error!")
    if (showAction != -1) {
      this.setData({
        isShown: showAction
      })
    }
  },

  newQuestion: function() {
    this.clearResult()
    var k1 = parseInt((Math.random() * 100).toFixed(0))
    var k2 = parseInt((Math.random() * 100).toFixed(0))
    var opIndex = Math.floor((Math.random() * 4)) //0 +, 1 -, 2 *, 3 / 
    if (opIndex == 1) {
      //减法要保证k1>=k2
      if (k1 < k2) {
        let tmp = k1
        k1 = k2
        k2 = tmp
      }
    }
    else if (opIndex == 3) {
      //除法要保证k2不为0且能被k1整除
      while (k2 == 0) {
        k2 = parseInt((Math.random() * 100).toFixed(0))
      }
      let tmp = parseInt(100/k2)
      let tmp1 = parseInt((Math.random() * tmp).toFixed(0))
      k1 = k2 * tmp1
    }
    var newQuestionString = k1.toString() + this.data.op[opIndex] + k2.toString() + "=?"
    //存储题目算式和正确答案
    var res = null
    if (opIndex == 0) {
      res = k1 + k2
    }
    else if (opIndex == 1) {
      res = k1 - k2
    }
    else if (opIndex == 2) {
      res = k1 * k2
    }
    else if (opIndex == 3) {
      res = k1 / k2
    }
    else
      console.log("Invalid Operator Index: " + opIndex)
    var num = this.data.number
    var seq = num + 1
    var equation_string = seq + "、" + k1 + " " + this.data.op[opIndex] + " " + k2 + " = "+res
    var equation = {k1: k1, k2: k2, op: this.data.op[opIndex], res: res, str: equation_string, correct: -1}
    this.data.results.push(equation)
    if (num < this.data.totalNum) {
      this.setData({
        number: num + 1,
        question: newQuestionString,
        isShown: -1, //隐藏action buttons (start, next, finish)
        focus: true,
        isDisabled: false //enable the input box on clicking the button
      })
    }
  },
  
  setResult: function(e) {
    var res = parseInt(e.detail.value)
    this.setData({
      result: res
    })
  },

  clearResult: function() {
    this.setData({
      result: null,
      isCorrect: -1,
      focus: true
    })
  },

  checkResult: function() {
    var num = this.data.number - 1
    var equation = this.data.results[num]
    var correct
    var sc = this.data.score
    if (equation.res == this.data.result)
      correct = 1
    else
      correct = 0
    this.data.results[num].correct = correct
    sc = sc + correct
    this.setData({
      isCorrect: correct,
      isDisabled: true,
      score: sc
    })
    this.showActionImg()
  },

  showResultView: function() {
    for (var num = 0; num < this.data.number; num++) {
      let equ = "results["+num+"]"
      let equation = this.data.results[num]
      this.setData({
        [equ]: equation
      })
    }
    this.setData({
      showResult: true
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '算术小练习'
    })
    var height = wx.getSystemInfoSync().windowHeight
    height = height - 100
    this.setData({
      result_height: height
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