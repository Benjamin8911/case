import { COIN } from '../../constant'

export const getCoin = name => {
    name = name.toUpperCase()
    if (COIN[name]) {
	    return {
	        img: COIN[name].icon,
	        name: COIN[name].name,
	        unit: COIN[name].symbol,
	        num: 0,
	        worth: 0
	    }
	} else {
		return {}
	}
}