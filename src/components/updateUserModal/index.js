import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateUser } from '../../Query/auth/index.query'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from '@nextui-org/react'
import { useForm, Controller } from 'react-hook-form'

export default function UpdateUserModal({
	isOpen,
	onOpen,
	onOpenChange,
	data,
}) {
	const queryClient = useQueryClient()
	const { mutate: updateUserData } = useMutation(updateUser, {
		onSuccess: () => {
			queryClient.invalidateQueries('getUser')
			onOpen()
		},
	})
	const { control, handleSubmit, reset } = useForm()
	useEffect(() => {
		reset(data)
	}, [data])
	function onSubmit(data) {
		updateUserData({ contactNo: data?.contactNo, city: data?.city })
	}
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
				<ModalContent>
					{() => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className='flex flex-col gap-1'>
								Update profile
							</ModalHeader>
							<ModalBody>
								<Controller
									control={control}
									name='contactNo'
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
