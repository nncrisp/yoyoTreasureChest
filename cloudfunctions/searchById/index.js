// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event._id)
  console.log(event.collection_name)
  const db = cloud.database()
  return db.collection('menu').where({
    _id:event._id
  }).get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
}