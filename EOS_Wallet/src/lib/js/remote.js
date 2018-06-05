import axios from 'axios'

const server = 'http://192.168.31.201:9999'
// const server = 'http://192.168.31.158:9999'
// const server = 'http://www.safetoken.vip'
const server_online = 'http://www.safetoken.vip'


const request = {
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    CHECK_USER_LEGALITY: '/user/check',
    CREATE_WALLET: '/user/createwallert',
    FIND_WALLET: '/user/findwallert',
    MARKETS: '/api/market/markets',
    CHECK_USER_COIN_TYPE: '/api/market/currcncys',
    SEND_SMS: '/send_sms',
    ADD_MARKET: '/market/addMarket',
    DELETE_MARKET: '/market/deleteMarket',
    QUERY_USER: '/user',
    FIND_LOGIN_PASSWORD: '/user/findLoginPassword',
    SET_TRANSACTION_RECORD: '/api/market/addOrder',
    GET_TRANSACTION_RECORD: '/api/market/orderList',
    MODIFY_WALLERT_PASSWORD: '/user/modifyWallertPassword',
    SAVE_CONTACTS: '/api/market/saveContacts',
    GET_CONTACTS: '/api/market/contacts',
    FIND_WALLET_BY_KEYSTORE: '/user/findstoreKeyByWallert/',
    FIND_WALLET_BY_PRIVATE: '/user/findPrivatyKeyByWallert',
    BIND_EMAIL_PHONE: '/user/bindEmailOrTelephone',
    MARKET_WALLET: '/api/market/eos/wallert_',
    SEARCH_PEOPLE: '/api/market/eos/searchPeoplewallert_',
    SEARCH_WALLET: '/api/market/eos/searchwallert_'
}

const stringify = (params) => {
    if ('object' !== typeof params) {
        return ''
    }
    let string = ''
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            string += '&' + key + '=' + params[key]
        }
    }
    return string.substr(1)
}


// 用户注册
const register = (params) => {
    return axios.post(`${server + request.REGISTER}`, stringify(params))
}

// 用户登录
const login = (params) => {
    return axios.post(`${server + request.LOGIN}`, stringify(params), { timeout: 5000 })
}

// 检查用户是否合法
const check_user_legality = (params) => {
    return axios.get(`${server + request.CHECK_USER_LEGALITY}/${params.param}/${params.type}`)
}

// 根据密码生成钱包
const create_wallet = (params, ticket) => {
    return axios.post(`${server + request.CREATE_WALLET}/${ticket}`, stringify(params))
}

// 根据助记词找回钱包
const find_wallet = (params) => {
    return axios.post(`${server + request.FIND_WALLET}/${params.ticket}`, stringify(params))
}

// 根据keystore找回钱包
const find_wallet_by_keystore = (params) => {
    return axios.post(`${server + request.FIND_WALLET_BY_KEYSTORE}/${params.ticket}`, stringify(params))
}

// 根据私钥找回钱包
const find_wallet_by_private = (params) => {
    return axios.post(`${server + request.FIND_WALLET_BY_PRIVATE}/${params.ticket}`, stringify(params))
}

// 以太坊各以太币种行情
const markets = () => {
    return axios.post(`${server + request.MARKETS}`, {})
}

// 根据ticket返回用户拥有的币种
const check_user_coin_type = (params) => {
    return axios.post(`${server + request.CHECK_USER_COIN_TYPE}/${params.ticket}`)
}

// 发送验证码
const send_sms = (params) => {
    return axios.post(`${server + request.SEND_SMS}`, stringify(params), { timeout: 5000 })
}

// 添加资产
const add_market = (params) => {
    return axios.get(`${server + request.ADD_MARKET}/${params.number}/${params.ticket}`)
}

// 删除资产
const delete_market = (params) => {
    return axios.get(`${server + request.DELETE_MARKET}/${params.number}/${params.ticket}`)
}

// 查询用户对象
const query_user = (params) => {
    return axios.get(`${server + request.QUERY_USER}/${params.ticket}`)
}

// 找回密码 | 修改登录密码
const find_password = (params) => {
    return axios.post(`${server + request.FIND_LOGIN_PASSWORD}`, stringify(params))
}

// 增加交易记录
const set_transaction_record = (params) => {
    let ticket = params.ticket
    delete params.ticket
    return axios.post(`${server + request.SET_TRANSACTION_RECORD}/${ticket}`, stringify(params))
}

// 获取交易记录
const get_transaction_record = (params) => {
    let ticket = params.ticket
    delete params.ticket
    return axios.post(`${server + request.GET_TRANSACTION_RECORD}/${ticket}`, stringify(params))
}

// 修改钱包密码 {
const modify_wallert_password = params => {
    return axios.post(`${server + request.MODIFY_WALLERT_PASSWORD}/${params.ticket}`, stringify(params))
}

// 备份联系人
const save_contacts = params => {
    return axios.post(`${server + request.SAVE_CONTACTS}/${params.ticket}`, stringify(params))
}

// 取回联系人
const get_contacts = params => {
    return axios.post(`${server + request.GET_CONTACTS}/${params.ticket}`)
}

// 绑定手机
const bing_phone = params => {
    return axios.post(`${server + request.BIND_EMAIL_PHONE}/${params.param}/2/${params.ticket}`)
}

// 绑定邮箱
const bing_email = params => {
    return axios.post(`${server + request.BIND_EMAIL_PHONE}/${params.param}/3/${params.ticket}`)
}

// 查询行情
const get_market = params => {
    return axios.post(`${server_online + request.MARKET_WALLET}`, stringify(params))
}

// 大家都正在搜
const search_people = params => {
    return axios.get(`${server_online + request.SEARCH_PEOPLE}`)
}

// 搜索行情
const search_wallet = params => {
    return axios.post(`${server_online + request.SEARCH_WALLET}`, stringify(params))
}

export default {
    register,
    login,
    check_user_legality,
    create_wallet,
    find_wallet,
    markets,
    check_user_coin_type,
    send_sms,
    add_market,
    delete_market,
    query_user,
    find_password,
    set_transaction_record,
    get_transaction_record,
    modify_wallert_password,
    find_wallet_by_keystore,
    find_wallet_by_private,
    save_contacts,
    get_contacts,
    bing_phone,
    bing_email,
    get_market,
    search_people,
    search_wallet
}