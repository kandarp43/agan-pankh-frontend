/* eslint-disable no-restricted-globals */
import axios from 'axios'
import { removeToken } from './helpers'

export function setUrl(
	url = process.env.REACT_APP_BASE_URL,
	options = { prod: false }
) {
	if (options.prod) return process.env.REACT_APP_BASE_URL
	if (process.env.NODE_ENV === 'development') return url
	return process.env.REACT_APP_BASE_URL
}
const Axios = axios.create({
	// just set prod to true for using production server
	baseURL: setUrl('https://aganpankh.site/api', { prod: false }),
})

Axios.interceptors.request.use(
	(req) => {
		const token =
			localStorage.getItem('token') || sessionStorage.getItem('token')
		if (!req.headers.Authorization && token) {
			req.headers.Authorization = token
			return req
		}
		return req
	},
	(err) => {
		return Promise.reject(err)
	}
)
Axios.interceptors.response.use(
	(res) => {
		return res
	},
	(err) => {
		if (
			(err?.response && err?.response?.status === 417) ||
			err?.response?.status === 401
		) {
			removeToken()
			location.pathname = '/login'
			return Promise.reject(err)
		}
		return Promise.reject(err)
	}
)

export default Axios
