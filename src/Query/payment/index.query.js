import Axios from '../../axios'

export function createPayment() {
	return Axios.post('/v1/payment/create-payment/upi')
}
