import Axios from '../../axios'

export function testsList() {
	return Axios.get('/v1/tests/list')
}
export function testById(id) {
	return Axios.get(`/v1/tests/get-test/${id}`)
}
