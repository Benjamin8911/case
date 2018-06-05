function getItem(key) {
    if (typeof plus === 'undefined') {
        return window.localStorage.getItem(key)
    } else {
        return plus.storage.getItem(key) // eslint-disable-line
    }
}

function setItem(key, value) {
    if (typeof plus === 'undefined') {
        return window.localStorage.setItem(key, value)
    } else {
        return plus.storage.setItem(key, value) // eslint-disable-line
    }
}

export const getLanguage = () => {
    return getItem('language')
}

export const setLanguage = language => {
    setItem('language', language)
}

export const getContent = (username) => {
    return JSON.parse(getItem(username)) || {}
}

export const setContent = (username, content) => {
    setItem(username, JSON.stringify(content))
}

export const getList = (key) => {
    return JSON.parse(getItem(key)) || []
}

export const addList = (key, item) => {
    let list = JSON.parse(getItem(key)) || []
    list.push(item)
    setItem(key, JSON.stringify(list))
}

export const updateList = (key, list) => {
    setItem(key, JSON.stringify(list))
}


// 数据结构 为二级结构 用户名下存放该用户数据
// 二级存放该用户的钱包、联系人等数据
// username: { wallet: 'walletKey', contacts: 'contactsKey' }
// walletKey: [ {Wallet1}, {Wallet2}, ... ]
// contactsKey: [ {Contacts1}, {Contacts2}, ... ]