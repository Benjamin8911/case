
export function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

export function authorize () {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: 'scope.userInfo',
      success: resolve,
      fail: reject
    })
  })
}

export function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      success: resolve,
      fail: reject
    })
  })
}

export default {
  login,
  authorize,
  getUserInfo
}
