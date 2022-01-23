// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.name)
  const db = cloud.database()
  return db.collection('tea').where({
    name:event.name
  }).get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
}