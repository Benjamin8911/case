const api = function (url, options = {}) {
  const { method = 'GET', data = {}, header = {'content-type': 'application/json'} } = options
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      header: header,
      url: 'https://api.myofferdemo.com' + url,
      data: data,
      success: res => {
        return resolve(res.data || {})
      },
      fail: err => {
        return reject(err)
      }
    })
  })
}

const login = function (code) {
  return api('/api/v1/applet/login', {
    method: 'POST',
    data: {
      appletName: 'applet',
      code: code
    }
  })
}

const loginState = function (data) {
  return api('/api/v1/applet/login-auth', {
    method: 'POST',
    data: data
  })
}

const fetchHelperList = function (data) {
  return api('/api/v1/wxelevens/20181111/list-helpers', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const addressAdd = function (data) {
  return api('/api/v1/wxelevens/20181111/draw-award-scarf', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const schoolRewardService = function (data) {
  return api('/api/v1/wxelevens/20181111/draw-award-service-add', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const sponsor = function (data) {
  return api('/api/v1/wxelevens/20181111/sponsor', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const helper = function (data) {
  return api('/api/v1/wxelevens/20181111/helper', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const schoolList = function (data) {
  return api('/api/v1/wxelevens/20181111/custom-schools', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const timer = function (data) {
  return api('/api/v1/wxelevens/20181111/count-down', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

const sendMessage = function (data) {
  return api('/api/v1/wxelevens/20181111/send-template-message', {
    header: {
      'apikey': data.token
    },
    data: data
  })
}

export default {
  login,
  loginState,
  fetchHelperList,
  addressAdd,
  schoolRewardService,
  helper,
  sponsor,
  schoolList,
  timer,
  sendMessage
}
