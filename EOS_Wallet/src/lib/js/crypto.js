import CryptoJS from 'crypto-js'
import store from '../../store'
import { KEY, IV } from '../../constant'

const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(store.state.username).toString())
const iv  = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString().substr(0,16))

export const encrypt = data => {
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

export const decrypt = encrypted => {
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export const MD5 = data => {
    return CryptoJS.MD5(data).toString()
}

export const encryptByKey = (data, key) => {
    let iv = CryptoJS.enc.Utf8.parse(key.substr(IV, 16))
    key = CryptoJS.enc.Utf8.parse(KEY + key.substr(0,10))
    console.log(iv.toString(), key.toString())
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
}

export const encryptKey = (data, key) => {
    let iv = CryptoJS.enc.Utf8.parse(KEY.substr(0, 16))
    key = CryptoJS.enc.Utf8.parse(KEY.substr(0,16))
    console.log(iv.toString(CryptoJS.enc.Utf8), key.toString(CryptoJS.enc.Utf8))
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
}

export const decryptByKey =  (data, key)  => {
    data = data.replace(/\s/g, '')
    let iv = CryptoJS.enc.Utf8.parse(KEY.substr(0, 16))
    key = CryptoJS.enc.Utf8.parse(KEY.substr(0,16))
    var decrypted = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}