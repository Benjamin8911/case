export const CHINESE = 'CHINESE'
export const ENGLISH = 'ENGLISH'
export const RMB = 'RMB'
export const DOLLAR = 'DOLLAR'

export const KEY = '77a3379ccab2522f5684aa'
export const IV = '6'
export const COIN = {
    '1ST': {
        name: '第一滴血',
        symbol: '1ST',
        icon: require('../static/images/coin/1ST.png')
    },
    'ANT': {
        name: '小蚁币',
        symbol: 'ANT',
        icon: require('../static/images/coin/ANT.png')
    },
    'BAT': {
        name: '注意力币',
        symbol: 'BAT',
        icon: require('../static/images/coin/BAT.png')
    },
    'BNT': {
        name: '班科币',
        symbol: 'BNT',
        icon: require('../static/images/coin/BNT.png')
    },
    'BTM': {
        name: '比原链',
        symbol: 'BTM',
        icon: require('../static/images/coin/BTM.png')
    },
    'CREDO': {
        name: 'CREDO',
        symbol: 'CREDO',
        icon: require('../static/images/coin/CREDO.png')
    },
    'DGD': {
        name: '黄金代币',
        symbol: 'DGD',
        icon: require('../static/images/coin/DGD.png')
    },
    'DPY': {
        name: '天算',
        symbol: 'DPY',
        icon: require('../static/images/coin/DPY.png')
    },
    'EOS': {
        name: '柚子',
        symbol: 'EOS',
        icon: require('../static/images/coin/EOS.png')
    },
    'ETH': {
        name: '以太坊',
        symbol: 'ETH',
        icon: require('../static/images/coin/ETH.png')
    },
    'GNT': {
        name: 'Golem',
        symbol: 'GNT',
        icon: require('../static/images/coin/GNT.png')
    },
    'LRC': {
        name: '路印协议',
        symbol: 'LRC',
        icon: require('../static/images/coin/LRC.png')
    },
    'MANA': {
        name: 'Decentraland',
        symbol: 'MANA',
        icon: require('../static/images/coin/MANA.png')
    },
    'MKR': {
        name: 'Maker',
        symbol: 'MKR',
        icon: require('../static/images/coin/MKR.png')
    },
    'MYST': {
        name: 'Mysterium 密链',
        symbol: 'MYST',
        icon: require('../static/images/coin/MYST.png')
    },
    'PAY': {
        name: 'TenX',
        symbol: 'PAY',
        icon: require('../static/images/coin/PAY.png')
    },
    'REP': {
        name: 'Augur',
        symbol: 'REP',
        icon: require('../static/images/coin/REP.png')
    },
    'SNT': {
        name: 'Status',
        symbol: 'SNT',
        icon: require('../static/images/coin/SNT.png')
    },
    'STAR': {
        name: 'Starbase',
        symbol: 'STAR',
        icon: require('../static/images/coin/STAR.png')
    }
}

// 验证正则
export const REGS = {
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    phone: /^[1][3,4,5,7,8][0-9]{9}$/,
    // loginPsd: /^[A-Za-z0-9]{8,20}$/,
    loginPsd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
    vcode: /^[0-9]{6}$/
}