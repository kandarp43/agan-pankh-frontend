import Axios from '../../axios'

export function g_signin(idToken) {
	return Axios.post('/v1/users/auth/google-signin', { idToken })
}
export function getUser() {
	return Axios.get('/v1/users')
}
export function updateUser({ authToken, data }) {
	return Axios.put(
		'/v1/users/update',
		data,
		authToken
			? {
					headers: {
						Authorization: authToken,
					},
			  }
			: {}
	)
}
