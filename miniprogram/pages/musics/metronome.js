// pages/musics/metronome.js
const audioStrong = wx.createInnerAudioContext() //强 - 音频,音频长度0.078367s(约为78ms)
const audioMedium = wx.createInnerAudioContext() //次强 - 音频,音频长度0.130612s(约为131ms)
const audioWeak = wx.createInnerAudioContext() //弱 - 音频,音频长度0.130612s(约为131ms)

Page({
  /**
   * Page initial data
   */
  data: {
    value: [0,1,2,3,4,5,6,7,8,9],
    range: ['1/2', '2/2', '1/4', '2/4', '3/4', '4/4','3/8','4/8','5/8','6/8'],
    bpm: 60, //beats per minute - 每分钟节拍数
    minbpm: 30,
    maxbpm: 120,
    note: '4/4',
    currentColor: 'black',
    startStatus: false, //disabled = false, enable the button
    stopStatus: true, //disabled = true, disable the buton
    isPlay: null,
    isPlay1: [],
    /*audioSrc: ['https://796f-yoyo-17a8b7-1258524314.tcb.qcloud.la/audio/audio_strong.mp3', 'https://796f-yoyo-17a8b7-1258524314.tcb.qcloud.la/audio/audio_sub_strong.mp3','https://796f-yoyo-17a8b7-1258524314.tcb.qcloud.la/audio/audio_weak.mp3']*/
    audioSrc:['/sounds/audio_strong.mp3','/sounds/audio_sub_strong.mp3','/sounds/audio_weak.mp3']
    //audioDuration: [78, 131, 131]
  },
  setBpm: function(e){
    this.setData({
      bpm: e.detail.value
    })
  },
  /**
   * Config Change
   */
  bindConfigChange: function (e) {
    this.setData({
      //显示拍号
      value: e.detail.value,
      note: this.data.range[e.detail.value]
    });
  },
  /*播放音频并改变字体颜色*/
  playAudioChangeColor: function(){
    var that = this;
    let notetype = parseInt(this.data.note.substring(2)); //几分音符
    let notenum = parseInt(this.data.note); //每小节几拍
    let realBpm = this.data.bpm * notetype / 4;
    var currentInterval = 60000/realBpm;
    var isPlay = this.data.isPlay;
    var isPlay1 = this.data.isPlay1;
    var playAudio;
    that.setData({
      startStatus: true,
      stopStatus: false
    })
    clearInterval(isPlay);
    for (var i in isPlay1){
      clearTimeout(isPlay1[i]);
    }
    audioStrong.src = this.data.audioSrc[0];
    audioMedium.src = this.data.audioSrc[1];
    audioWeak.src = this.data.audioSrc[2];
    if (notenum == 1){
      //每小节1拍 - 强
      playAudio = function () {
        audioStrong.play();
        console.log(new Date().getTime());
        that.setData({
          currentColor: 'black'
        });
        return playAudio;
      };
      isPlay = setInterval(playAudio(), currentInterval);
    }
    else if (notenum == 2){
      //每小节2拍 - 强 弱
      playAudio = function () {
        audioStrong.play();
        console.log("strong: " + new Date().getTime());
        that.setData({
          currentColor: 'black'
        }
        );
        isPlay1.push(setTimeout(function () {
          audioWeak.play();
          console.log("weak: " + new Date().getTime());
          that.setData({
            currentColor: 'lightpink'
          });
        }, currentInterval));
        that.setData({
          isPlay1: isPlay1
        });
        return playAudio;
      }
      isPlay = setInterval(playAudio(), currentInterval*2);
      that.setData({
        isPlay1: isPlay1
      });
    }
    else if (notenum == 3){
      //每小节3拍 - 强 弱 弱
      playAudio = function () {
        audioStrong.play();
        that.setData({
          currentColor: 'black'
        });
        var t;
        for (t = 1; t <= 2; t++) {
          isPlay1.push(setTimeout(function () {
            audioWeak.play();
            that.setData({
              currentColor: 'lightpink'
            });
          }, currentInterval * t));
        }
        return playAudio;
      }
      isPlay = setInterval(playAudio(), currentInterval * 3);
    }
    else if (notenum == 4){
      //每小节4拍 - 强 弱 次强 弱
      playAudio = function () {
        //强
        audioStrong.play();
        that.setData({
          currentColor: 'black'
        });
        //弱
        isPlay1.push(setTimeout(function () {
          audioWeak.play();
          that.setData({
            currentColor: 'lightpink'
          });
        }, currentInterval));
        //次强
        isPlay1.push(setTimeout(function () {
          audioMedium.play();
          that.setData({
            currentColor: 'deepskyblue'
          });
        }, currentInterval * 2));
        //弱
        isPlay1.push(setTimeout(function () {
          audioWeak.play();
          that.setData({
            currentColor: 'lightpink'
          });
        }, currentInterval * 3));
        return playAudio;
      }
      isPlay = setInterval(playAudio(), currentInterval * 4);
      that.setData({
        isPlay1: isPlay1
      });
    }
    else if (notenum == 5){
      //每小节5拍 - 强 弱 弱 次强 弱
      playAudio = function () {
        //强
        audioStrong.play();
        that.setData({
          currentColor: 'black'
        });
        //弱 弱
        var t;
        for (t = 1; t <= 2; t++) {
          isPlay1.push(setTimeout(function () {
            audioWeak.play();
            that.setData({
              currentColor: 'lightpink'
            });
          }, currentInterval * t));
        }
        //次强
        isPlay1.push(setTimeout(function () {
          audioMedium.play();
          that.setData({
            currentColor: 'deepskyblue'
          });
        }, currentInterval * 3));
        //弱
        isPlay1.push(setTimeout(function () {
          audioWeak.play();
          that.setData({
            currentColor: 'lightpink'
          });
        }, currentInterval * 4));
        return playAudio;
      }
      isPlay = setInterval(playAudio(), currentInterval * 5);
      that.setData({
        isPlay1: isPlay1
      });
    }
    else if (notenum == 6){
      //notenum == 6 每小节6拍 - 强 弱 弱 次强 弱 弱
      playAudio = function () {
        //强
        audioStrong.play();
        that.setData({
          currentColor: 'black'
        });
        //弱 弱
        var t;
        for (t = 1; t <= 2; t++) {
          isPlay1.push(setTimeout(function () {
            audioWeak.play();
            that.setData({
              currentColor: 'lightpink'
            });
          }, currentInterval * t));
        }
        //次强
        isPlay1.push(setTimeout(function () {
          audioMedium.play();
          that.setData({
            currentColor: 'deepskyblue'
          });
        }, currentInterval * 3));
        //弱 弱
        for (t = 4; t <= 5; t++) {
          isPlay1.push(setTimeout(function () {
            audioWeak.play();
            that.setData({
              currentColor: 'lightpink'
            });
          }, currentInterval * t));
        }
        return playAudio;
      }
      isPlay = setInterval(playAudio(), currentInterval * 6);
      that.setData({
        isPlay1: isPlay1
      });
    }
    else {
      this.stopAudioResetColor();
    }
    that.setData({
      isPlay: isPlay
      //startStatus: true,
      //stopStatus: false
    });
  },
  
  stopAudioResetColor: function(){
    //停止播放
    for (var i in this.data.isPlay1) {
      clearTimeout(this.data.isPlay1[i]);
    }
    clearInterval(this.data.isPlay);
    //重置文本颜色为黑色
    this.setData({
      currentColor: 'black',
      startStatus: false,
      stopStatus: true
    });
    audioStrong.stop();
    audioMedium.stop();
    audioWeak.stop();
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'YOYO节拍器'
    })
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
      })
    audioStrong.src = this.data.audioSrc[0];
    audioMedium.src = this.data.audioSrc[1];
    audioWeak.src = this.data.audioSrc[2];
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
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
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
    clearInterval(this.data.isPlay);
    for (var i in this.data.isPlay1){
      clearTimeout(this.data.isPlay1[i]);
    }
    //audioStrong.destroy();
    //audioMedium.destroy();
    //audioWeak.destroy();
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