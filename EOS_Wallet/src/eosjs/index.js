let Eos = require('eosjs')
let ecc = require('eosjs-ecc')

let config = {
  keyProvider: ['PrivateKeys...'], // WIF string or array of keys..
  httpEndpoint: 'http://192.168.31.60:8888',
  mockTransactions: () => 'pass', // or 'fail'
  transactionHeaders: (expireInSeconds, callback) => {
    callback(null/*error*/, headers)
  },
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true
}

let eos = Eos.Localnet(config)

ecc.randomKey().then(privateKey => {
	console.log('Private Key:\t', privateKey) // wif
	console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
})


export default { eos, ecc }