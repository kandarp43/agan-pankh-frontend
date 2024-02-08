import React from 'react'
import GoogleSignin from '../../components/google-sign'
import { H1 } from '../../components/common/heading'

export default function Login() {
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
