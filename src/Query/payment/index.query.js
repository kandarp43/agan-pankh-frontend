import Axios from '../../axios'

export function createPayment(promoCode) {
	return Axios.post('/v1/payment/create-payment/upi', { promoCode })
}
export function applyPromocode(promoCode) {
	return Axios.post('/v1/payment/check-promo', { promoCode })
}
