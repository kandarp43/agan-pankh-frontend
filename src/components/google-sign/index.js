import React, { useEffect, useRef } from 'react'
import { useMutation } from 'react-query'
import { g_signin } from '../../Query/auth/index.query'
import { addToken } from '../../helpers'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from '@nextui-org/react'
import { useForm, Controller } from 'react-hook-form'

export default function GoogleSignin({ ...props }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const authResponse = useRef()

	const { mutate } = useMutation(g_signin, {
		onSuccess: (response) => {
			console.log({ response })
			authResponse.current = response
			if (response.isNew) {
				onOpen()
			} else {
				addToken(response.token)
			}
		},
	})

	function setupGoogleLogin() {
		const { google } = window
		if (google) {
			google.accounts.id.initialize({
				client_id:
					'551543918721-pa8bnj7h29bl5bs984cjr9f1snflqf7l.apps.googleusercontent.com',
				callback: async (response) => {
					console.log(response.credential, 'G-token')
					mutate(response.credential)
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

	const { control, handleSubmit } = useForm()
	function onSubmit(data) {
		console.log(data)
	}
	return (
		<>
			<div id='google-sign-btn' {...props}></div>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				hideCloseButton
				backdrop='blur'
			>
				<ModalContent>
					{() => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
							<ModalBody>
								<Controller
									control={control}
									name='phone'
									rules={{
										required: 'This Field is Required',
										pattern: {
											value: /^\d+$/,
											message: 'Please enter only numbers',
										},
										minLength: {
											value: 10,
											message: 'Please enter your 10 digit number',
										},
										maxLength: {
											value: 10,
											message: 'Please enter your 10 digit number',
										},
									}}
									render={({ field, fieldState: { error } }) => (
										<Input
											autoFocus
											label='Contact'
											variant='bordered'
											isInvalid={!!error?.message}
											errorMessage={error?.message}
											{...field}
										/>
									)}
								/>
								<Controller
									control={control}
									name='city'
									rules={{
										required: 'This Field is Required',
										validate: (value) =>
											value?.trim()?.length > 0 || 'please enter a valid city',
									}}
									render={({ field, fieldState: { error } }) => (
										<Input
											label='City'
											type='text'
											variant='bordered'
											isInvalid={!!error?.message}
											errorMessage={error?.message}
											{...field}
										/>
									)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									type='submit'
									color='secondary'
									onClick={handleSubmit(onSubmit)}
								>
									Continue
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
