import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			onSettled: (_d, e, f) => {
				if (e?.message === 'Network Error') {
					queryClient.invalidateQueries('toast')
					queryClient.setQueryData('message', () => ({
						message: e?.message,
						type: 'error',
					}))
				} else if (e?.response?.status > 300) {
					queryClient.invalidateQueries('toast')
					queryClient.setQueryData('message', () => ({
						message:
							e?.response?.data.error ||
							e?.response?.data.message ||
							e?.message,
						type: 'error',
					}))
				}
			},
		},
		mutations: {
			onSettled: (_d, e) => {
				if (e?.message === 'Network Error') {
					queryClient.invalidateQueries('toast')
					queryClient.setQueryData('message', () => ({
						message: e?.message,
						type: 'error',
					}))
				}
				if (e?.response?.status === 500) {
					queryClient.invalidateQueries('toast')
					queryClient.setQueryData('message', () => ({
						message: e?.message,
						type: 'warning',
					}))
				}
				if (e?.response?.status > 300 && e?.response?.status < 500) {
					queryClient.invalidateQueries('toast')
					queryClient.setQueryData('message', () => ({
						message:
							e?.response?.data.error ||
							e?.response?.data.message ||
							e?.message,
						type: 'error',
					}))
				}
				if (e?.response?.status <= 500) {
					queryClient.invalidateQueries('toast')
					queryClient.setQueryData('message', () => ({
						message:
							e?.response?.data.error ||
							e?.response?.data.message ||
							e?.message,
						type: 'warning',
					}))
				}
			},
		},
		message: (msg, type) => {
			queryClient.invalidateQueries('toast')
			queryClient.setQueryData('message', () => ({ message: msg, type }))
		},
	},
})
