import React, { useEffect } from 'react'
import GoogleSignin from '../../components/google-sign'
import { H1 } from '../../components/common/heading'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	const navigate = useNavigate()
	useEffect(() => {
		const token =
			localStorage.getItem('token') || sessionStorage.getItem('token')
		if (token) {
			navigate('/')
		}
	}, [])
	return (
		<div className='container mx-auto py-4'>
			{/* <Card> */}
			{/* <CardBody> */}
			<div className='flex flex-col items-center justify-center'>
				<H1 className='my-4'>Login to Agan Pankh</H1>
				<GoogleSignin />
			</div>
			{/* </CardBody> */}
			{/* </Card> */}
		</div>
	)
}
