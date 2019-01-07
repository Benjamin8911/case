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
      appletName: 'emall',
      code: code
    }
  })
}
const loginState = function (data) {
  return api('/api/v1/applet/login-auth', {
    method: 'POST',
    data: {
      appletName: 'emall',
      source: 'applet-emall',
      ...data
    }
  })
}
const fetchBanners = function () {
  return api('/api/v1/banners', {
    data: {
      type: 'SPHD',
      source: 'm'
    }
  })
}
const fetchOrderList = function (data) {
  return api('/api/v1/orders', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      page: data.page,
      size: data.size
    }
  })
}
const fetchOrderDetail = function (data) {
  return api('/api/v1/orders/' + data.id, {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    }
  })
}
const fetchCommodityId = function (categoryMark, countryCode) {
  return api('/api/v1/skus/fixation', {
    data: {
      categoryMark: categoryMark,
      countryCode: countryCode
    }
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
const submitInfo = function (data) {
  return api('/api/v1/accounts/id-card', {
    method: 'PUT',
    header: {
      'apikey': data.apikey
    },
    data: data.data
  })
}
const checkIdentity = function (data) {
  return api('/api/v1/accounts/id-card', {
    header: {
      'apikey': data.apikey
    }
  })
}
const checkContract = function (data) {
  return api('/api/v1/contracts/sign-status', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      skuId: data.id
    }
  })
}
const fetchContract = function (data) {
  return api('/api/v1/contracts/contract-urls', {
    header: {
      'apikey': data.apikey,
      'content-type': 'application/json'
    },
    data: {
      skuId: data.id
    }
  })
}
const fetchContractForm = function (data) {
  return api('/api/v1/contracts/sign-view-form-data', {
    header: {
      'apikey': data.apikey
    },
    data: {
      skuId: data.id,
      redirect: encodeURIComponent('https://www.myoffer.cn/statics/contract/return.html?id=' + data.short_id)
    }
  })
}

const fetchCoupons = function (data) {
  return api('/api/v1/coupons', {
    header: {
      'apikey': data.apikey
    },
    data: {
      skuId: data.skuId
    }
  })
}

const checkPromote = function (data) {
  return api('/api/v1/promote-codes', {
    header: {
      'apikey': data.apikey
    },
    data: {
      promoteId: data.id
    }
  })
}

const createOrder = function (data) {
  return api('/api/v1/orders', {
    header: {
      'apikey': data.apikey
    },
    method: 'POST',
    data: {
      source: data.source,
      skuId: data.skuId,
      userCouponId: data.userCouponId,
      pId: data.pId
    }
  })
}

const deleteOrder = function (data) {
  return api('/api/v1/orders/' + data.order_id, {
    header: {
      'apikey': data.apikey
    },
    method: 'DELETE'
  })
}

const getService = function (data) {
  return api('/api/v1/sku/after-service-state', {
    header: {
      'apikey': data.apikey
    },
    data: {
      skuId: data.id
    }
  })
}

export default {
  login,
  loginState,
  fetchBanners,
  fetchOrderList,
  fetchOrderDetail,
  fetchCommodityId,
  fetchCommodityDetail,
  fetchCommdityComment,
  submitInfo,
  checkIdentity,
  checkContract,
  fetchContract,
  fetchContractForm,
  fetchCoupons,
  checkPromote,
  createOrder,
  deleteOrder,
  getService
}
