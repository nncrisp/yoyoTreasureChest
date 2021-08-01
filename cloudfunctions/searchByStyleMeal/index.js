// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.style)
  console.log(event.meal)
  const db = cloud.database()
  if (event.meal.length == 0){
    return db.collection('menu').where({
      style:db.command.in(event.style)
    }).field({
      name:true,
      picture:true,
      _id:true
    }).get({
      success(res){
        return res
      },
      fail(err){
        return err
      }
    })
  }
  else if (event.style.length == 0){
    return db.collection('menu').where({
      meal:db.command.all(event.meal)
    }).field({
      name:true,
      picture:true,
      _id:true
    }).get({
      success(res){
        return res
      },
      fail(err){
        return err
      }
    })
  }
  else {
    return db.collection('menu').where({
      style:db.command.in(event.style),
      meal:db.command.all(event.meal)
    }).field({
      name:true,
      picture:true,
      _id:true
    }).get({
      success(res){
        return res
      },
      fail(err){
        return err
      }
    })
  }
}