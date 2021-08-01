// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "yoyobox"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("menu").get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
  /*const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/
}