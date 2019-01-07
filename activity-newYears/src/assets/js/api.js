let baseUrl = process.env.API
const api = function (url, options = {}) {
  const { method = 'GET', data = {}, header = {'content-type': 'application/json'} } = options
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      header: header,
      url: baseUrl + url,
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
      appletName: 'wxNewYear2019',
      code: code
    }
  })
}
const loginState = function (data) {
  return api('/api/v1/applet/login-auth', {
    method: 'POST',
    data: {
      appletName: 'wxNewYear2019',
      source: 'applet-activity-wxNewYear2019',
      ...data
    }
  })
}

const fetchSchool = function () {
  return api('/svc/mo-eva/university-items')
}

const schoolStatus = function (data) {
  return api('/api/v1/wxnewyears/2019/school-status', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    }
  })
}

const schoolChoose = function (data) {
  return api('/api/v1/wxnewyears/2019/school', {
    method: 'POST',
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      schoolName: data.schoolName
    }
  })
}

const clockStatus = function (data) {
  return api('/api/v1/wxnewyears/2019/clock-status', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    }
  })
}

const clockIn = function (data) {
  return api('/api/v1/wxnewyears/2019/clock-in', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    }
  })
}

const sponsor = function (data) {
  return api('/api/v1/wxnewyears/2019/sponsor', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      formId: data.formId
    }
  })
}

const helper = function (data) {
  return api('/api/v1/wxnewyears/2019/helper', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      formId: data.formId,
      sponsor: data.sponsor
    }
  })
}

const listHelpers = function (data) {
  return api('/api/v1/wxnewyears/2019/list-helpers', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      sponsor: data.sponsor
    }
  })
}

const rankPersonal = function (data) {
  return api('/api/v1/wxnewyears/2019/personal-rank', {
    data: {
      rankType: data.rankType,
      sponsor: data.sponsor,
      start: data.start,
      end: data.end
    }
  })
}

const rankSchool = function (data) {
  return api('/api/v1/wxnewyears/2019/school-rank', {
    data: {
      rankType: data.rankType,
      sponsor: data.sponsor,
      start: data.start,
      end: data.end
    }
  })
}

const prizeDraw = function (data) {
  return api('/api/v1/wxnewyears/2019/prize-draw', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    }
  })
}

const wxCode = function (data) {
  return api('/api/v1/wxnewyears/2019/wx-code', {
    data: {
      sponsor: wx.getStorageSync('sponsor')
    }
  })
}

const getImageInfo = function (data) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: data,
      success: resolve,
      fail: reject
    })
  })
}

export default {
  login,
  loginState,
  fetchSchool,
  schoolStatus,
  schoolChoose,
  clockStatus,
  clockIn,
  sponsor,
  helper,
  listHelpers,
  rankPersonal,
  rankSchool,
  prizeDraw,
  wxCode,
  getImageInfo
}
