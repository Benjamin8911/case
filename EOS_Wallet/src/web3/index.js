import { NODE } from './config'
import contractList from './Contract_private.json'
const Web3 = require('web3')

// // 公链节点
// const node = 'http://192.168.31.55:8545'
// // 部署公链合约后，对应修改abiDefintion 和 合约地址Hash
// const abiDefintion = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"Funderss","outputs":[{"name":"tokenNumber","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSpace","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_publicAddress","type":"address"},{"name":"_tokenNumber","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_tokenspace","type":"uint256"}],"name":"minusAll","outputs":[{"name":"fals","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_publicAddresss","type":"address"},{"name":"_tokenspace","type":"uint256"}],"name":"getTokenNumber","outputs":[{"name":"tokenNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_publicAddress","type":"address"},{"name":"_tokenspace","type":"uint256"}],"name":"isTokenName","outputs":[{"name":"fals","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_publicAddress","type":"address"},{"name":"_tokenNumber","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_tokenspace","type":"uint256"}],"name":"setAll","outputs":[{"name":"fals","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_publicAddress","type":"address"},{"name":"_tokenNumber","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_tokenspace","type":"uint256"}],"name":"addAll","outputs":[{"name":"fals","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_publicAddress","type":"address"},{"name":"_tokenspace","type":"uint256"}],"name":"getTokenName","outputs":[{"name":"tokenName","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"publicAddress","type":"address"},{"indexed":false,"name":"tokenNumber","type":"uint256"},{"indexed":false,"name":"tokenName","type":"string"}],"name":"em","type":"event"}]
// const contractAddress = '0x7411B06ac670a0d7555a85a0ec0bF4E49A56d6ef'


class WEB3 {
    constructor(url) {
        try {
            this.web3 = new Web3(new Web3.providers.HttpProvider(url, 5000))
            // 获取合约
            // this.web3.eth.defaultAccount = this.web3.eth.coinbase
            // this.contract = this.web3.eth.contract(abi).at(address)
            this.contract = {}
            for (let contract in contractList) {
                this.contract[contract] = this.web3.eth.contract(contractList[contract].abi).at(contractList[contract].address)
            }
        } catch (e) {
            // console.warn(e)
        }
    }

    // 解锁账户
    unlock_account(accountHash, password, cb) {
        this.web3.personal.unlockAccount(accountHash, password, (error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }

    // 返回一次普通交易需要的gas
    /**
     * 
     * @param {Object} params 
     * {
     *  to: hash,
     *  value: value
     * }
     * @param {Function} cb 
     */
    get_gas(params, cb) {
        this.web3.eth.estimateGas(params, (error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }

    // 返回当前gas平均价格
    get_gas_price(cb) {
        this.web3.eth.getGasPrice((error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: this.web3.fromWei(result.toString(), 'ether') })
        })
    }

    // 返回当前节点持有账户列表
    get_accounts(cb) {
        this.web3.eth.getAccounts((error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }

    // 返回指定账户地址的余额
    get_balance(accountHash, cb) {
        this.web3.eth.getBalance(accountHash, (error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }

    // 发送交易并返回交易hash
    /**
     * 
     * @param {Object} params 
     * {
     *  from: 发送者账户hash
     *  to: 目标账户hash
     *  value: 发送数量 wei
     *  gas: gas
     *  gasPrice: gas价格
     *  data: 
     *  nonce: 可覆盖pending状态的你的交易
     * }
     */
    send_transaction(params, cb) {
        this.web3.eth.sendTransaction(params, (error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }

    // 获取指定交易的交易信息
    get_transaction(hash, cb) {
        this.web3.eth.getTransaction(hash, (error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }

    // 获取指定交易的交易收据
    get_transaction_receipt(hash, cb) {
        this.web3.eth.getTransactionReceipt(hash, (error, result) => {
            if (error) {
                return cb({
                    isError: true,
                    error: error,
                    data: result
                })
            }
            cb({ data: result })
        })
    }
}

export default new WEB3(NODE)