import Axios from '../../axios'

export function g_signin(idToken) {
	return Axios.post('/v1/users/auth/google-signin', { idToken })
}
