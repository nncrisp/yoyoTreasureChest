// pages/games/shapelab.js
var context=""
Page({
  /**
   * Page initial data
   */
  data: {
    shapeArray: ['圆形(circle)','三角形(triangle)','椭圆形(oval)','长方形(rectangle)','正方形(square)','平行四边形(parallelogram)','菱形(diamond)','五角星形(star)','心形(heart)'],
    shapeIndex: [0,1,2,3,4,5,6,7,8],
    shape: '圆形(circle)',
    colorArray:['skyblue','hotpink','black','white','yellow','grey','goldenrod','forestgreen','orange','cornflowerblue','maroon','red','mistyrose','blue','greenyellow','purple'],
    colorValue:'skyblue',
    textColor:'black'
  },
  
  onLoad:function() {
    wx.setNavigationBarTitle({
      title: '形状小制作'
    })
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
      })
  },

  onReady:function(){
    context=wx.createCanvasContext('myCanvas')
  },
  
  onShareAppMessage: function () {
  },

  setShape:function(e){
    this.setData({
      index: e.detail.value,
      shape: this.data.shapeArray[e.detail.value]
    })
  },

  setColor:function(e){
    this.setData({
      colorValue:e.target.id
    })
    //当选中的颜色为黑色时，用白色文字显示"颜色(Color)"。
    if(this.data.colorValue=='black'){
      this.setData({
        textColor:'white'
      })
    } else {
      this.setData({
        textColor: 'black'
      })
    }
  },

  drawShape:function(e){
    //获取屏幕比例，后面按照系数unit自适应地调整canvas绘图的坐标
    let unit=''
    wx.getSystemInfo({
      success:function(res){
        unit=res.windowWidth/375
      }
    })
    context.setFillStyle(this.data.colorValue)
    var myShape=this.data.shape
    if(myShape=='圆形(circle)'){
      context.arc(130*unit,130*unit,100*unit,0,2*Math.PI,true)
    } else if(myShape =='三角形(triangle)'){
      context.moveTo(130*unit,40*unit)
      context.lineTo(40*unit,210*unit)
      context.lineTo(220*unit,210*unit)
    } else if (myShape =='椭圆形(oval)'){
      context.beginPath()
      context.moveTo(30 * unit, 130 * unit)
      context.bezierCurveTo(30 * unit, 200 * unit, 230 * unit, 200 * unit, 230 * unit, 130 * unit)
      context.moveTo(30 * unit, 130 * unit)
      context.bezierCurveTo(30 * unit, 60 * unit, 230 * unit, 60 * unit, 230 * unit, 130 * unit)
    } else if (myShape =='长方形(rectangle)'){
      context.rect(80 * unit, 35 * unit, 100 * unit, 190 * unit)
    } else if (myShape =='正方形(square)'){
      context.rect(50 * unit, 50 * unit, 160 * unit, 160 * unit)
    } else if (myShape =='平行四边形(parallelogram)'){
      context.moveTo(80 * unit, 80 * unit)
      context.lineTo(230 * unit, 80 * unit)
      context.lineTo(180 * unit, 180 * unit)
      context.lineTo(30 * unit, 180 * unit)
    } else if (myShape =='菱形(diamond)'){
      context.moveTo(130 * unit, 30 * unit)
      context.lineTo(180 * unit, 130 * unit)
      context.lineTo(130 * unit, 230 * unit)
      context.lineTo(80 * unit, 130 * unit)
    } else if (myShape =='五角星形(star)'){
      //五角星代码是呦呦写的哦！
      context.moveTo(130 * unit, 50 * unit)
      context.lineTo(148 * unit, 104 * unit)
      context.lineTo(206 * unit, 104 * unit)
      context.lineTo(160 * unit, 140 * unit)
      context.lineTo(178 * unit, 196 * unit)
      context.lineTo(130 * unit, 160 * unit)
      context.lineTo(82 * unit, 196 * unit)
      context.lineTo(100 * unit, 140 * unit)
      context.lineTo(54 * unit, 104 * unit)
      context.lineTo(110 * unit, 104 * unit)
    } else if (myShape =='心形(heart)'){
      context.arc(80 * unit, 105 * unit, 50 * unit,0,2*Math.PI/3,true)
      context.arc(180 * unit, 105 * unit, 50 * unit,Math.PI/3,Math.PI,true)
      context.setStrokeStyle(this.data.colorValue)
      context.stroke()
      context.moveTo(207 * unit, 148 * unit)
      context.lineTo(130 * unit, 205 * unit)
      context.lineTo(53 * unit, 148 * unit)
    } else {
      //笑脸-更多形状敬请期待
      context.arc(100 * unit, 100 * unit, 60 * unit, 0, 2 * Math.PI, true)
      context.moveTo(140 * unit, 100 * unit)
      context.arc(100 * unit, 100 * unit, 40 * unit, 0, Math.PI, false)
      context.moveTo(85 * unit, 80 * unit)
      context.arc(80 * unit, 80 * unit, 5 * unit, 0, 2 * Math.PI, true)
      context.moveTo(125 * unit, 80 * unit)
      context.arc(120 * unit, 80 * unit, 5 * unit, 0, 2 * Math.PI, true)
      context.stroke()
      context.draw()
    }
    context.fill()
    context.draw()
  },

  clearShape:function(e){
    context.draw()
  } 
})