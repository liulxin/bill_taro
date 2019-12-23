const cloud = require('wx-server-sdk')

cloud.init({
  env: 'yuntest-wcqeq'
})


exports.main = async () => {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}