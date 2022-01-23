// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取指定collection里的所有记录
exports.main = async (event, context) => {
  console.log(event.collection_name)
  const db = cloud.database()
  return db.collection(event.collection_name).get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
}