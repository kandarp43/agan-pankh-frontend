import React, { useEffect } from 'react'

export default function GoogleSignin({ ...props }) {
	function setupGoogleLogin() {
		const { google } = window
		if (google) {
			google.accounts.id.initialize({
				client_id:
					'551543918721-pa8bnj7h29bl5bs984cjr9f1snflqf7l.apps.googleusercontent.com',
				callback: async (response) => {
					console.log(response.credential, 'G-token')
				},
			})
			google.accounts.id.renderButton(
				document.getElementById('google-sign-btn'),
				{
					shape: 'rectangular',
					theme: 'filled_blue',
				}
			)
		}
	}

	useEffect(() => {
		const url = 'https://accounts.google.com/gsi/client'
		const script = document.createElement('script')
		script.src = url
		script.async = true
		// script.setAttribute('strategy', 'lazyOnload')
		document.head.appendChild(script)
		script.onload = () => {
			setupGoogleLogin()
		}
	}, [])
	return <div id='google-sign-btn' {...props}></div>
}
