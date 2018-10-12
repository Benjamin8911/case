const api = function (url, options = {}) {
  const { method = 'GET', data = {} } = options
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: 'http://api.myoffer.cn' + url,
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
const fetchCommodityDetail = function (id) {
  return api('/api/v1/skus/seo', {
    data: {
      id: id
    }
  })
}
const fetchCommdityComment = function (id) {
  return api('/api/v1/skus/comments', {
    data: {
      filters: { sku: id }
    }
  })
}

export default {
  fetchCommodityDetail,
  fetchCommdityComment
}
