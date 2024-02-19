import Axios from '../../axios'

export function testsList() {
	return Axios.get('/v1/tests/list')
}
export function testById(id) {
	return Axios.get(`/v1/tests/get-test/${id}`)
}
export function resultById(id) {
	return Axios.get(`/v1/test-results/show-results/${id}`)
}
export function submitTestAnswer({ id, data }) {
	return Axios.post(`/v1/tests/post-answer/${id}`, data)
}
export function submitTest({ id, data }) {
	return Axios.post(`/v1/test-results/submit-test/${id}`, data)
}
export function startTest({ id, data }) {
	return Axios.post(`/v1/tests/test-session/start/${id}`, data)
}
