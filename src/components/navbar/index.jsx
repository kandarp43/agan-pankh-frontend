import React, { useEffect, useState } from 'react'
import {
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
	Modal,
	ModalContent,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react'
import { getUser } from '../../Query/auth/index.query'
import { useMutation, useQuery } from 'react-query'
import { H3, H4 } from '../common/heading'
import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../../helpers'
import { applyPromocode, createPayment } from '../../Query/payment/index.query'
import UpdateUserModal from '../updateUserModal'
import logo from '../../assets/images/agan-pankh.png'

export default function HeaderBar({ noAuth }) {
	const [promo, setPromo] = useState({ value: '', error: '' })
	const navigate = useNavigate()
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const {
		isOpen: isOpenUser,
		onOpen: onOpenUser,
		onOpenChange: onOpenChangeUser,
	} = useDisclosure()

	const { data } = useQuery('getUser', getUser, {
		select: (d) => d.data.data,
		enabled: !noAuth,
	})

	const { mutate, isLoading } = useMutation(createPayment, {
		onSuccess: (data) => {
			if (data.data?.data?.short_url) {
				window.location.href = data.data?.data?.short_url
			}
		},
	})
	const { mutate: mutatePromo, isLoading: isMutateLoading } = useMutation(
		applyPromocode,
		{
			onSuccess: (data) => {
				if (data?.data?.code?.price) {
					setPromo({ ...promo, price: data.data.code.price, error: null })
				}
			},
			onError: (error) => {
				if (error?.response?.data?.message) {
					setPromo({
						value: promo.value,
						error: error?.response?.data?.message,
					})
				}
			},
		}
	)
	useEffect(() => {
		document.addEventListener('buyPlan', onOpen)
		return () => document.removeEventListener('buyPlan', onOpen)
	}, [])

	function onBuyPremium() {
		mutate(promo?.value)
	}
	function handlePromo(e) {
		setPromo({ ...promo, value: e?.toUpperCase(), price: null })
	}
	function applyPromo(e) {
		e?.preventDefault && e.preventDefault()
		if (promo?.value) {
			mutatePromo(promo?.value)
		}
	}

	function logout() {
		removeToken()
		navigate('/login')
	}
	return (
		<>
			<Navbar isBordered maxWidth='full'>
				<div className='container mx-auto flex items-center justify-between'>
					<NavbarBrand>
						<img
							src={logo}
							alt='logo'
							className='h-12 cursor-pointer'
							onClick={() => navigate('/')}
						/>
						<p
							className='pl-2 font-bold text-xs sm:text-base text-inherit cursor-pointer'
							onClick={() => navigate('/')}
						>
							AganPankh
						</p>
					</NavbarBrand>

					{/* <NavbarContxent className='hidden sm:flex gap-4' justify='center'>
					<NavbarItem>
						<Link color='foreground' href='#'>
							Features
						</Link>
					</NavbarItem>
					<NavbarItem isActive>
						<Link href='#' aria-current='page' color='secondary'>
							Customers
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color='foreground' href='#'>
							Integrations
						</Link>
					</NavbarItem>
				</NavbarContxent> */}

					{!noAuth ? (
						<NavbarContent as='div' justify='end'>
							<Link
								className='ml-3 font-bold text-xs sm:text-base text-inherit cursor-pointer'
								to='/about-us'
							>
								About Us
							</Link>
							<Dropdown placement='bottom-end'>
								<DropdownTrigger>
									<Avatar
										isBordered
										as='button'
										className='transition-transform'
										color='secondary'
										name='Jason Hughes'
										size='sm'
										src={logo}
									/>
								</DropdownTrigger>
								<DropdownMenu aria-label='Profile Actions' variant='flat'>
									<DropdownItem key='profile' isReadOnly className='h-14 gap-2'>
										<p className='font-semibold'>Signed in as</p>
										<p className='font-semibold'>{data?.email || null}</p>
									</DropdownItem>
									<DropdownItem key='update-profile' onClick={onOpenUser}>
										Update profile
									</DropdownItem>
									<DropdownItem key='logout' color='danger' onClick={logout}>
										Log Out
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</NavbarContent>
					) : null}
				</div>
			</Navbar>
			<Modal
				isOpen={isOpen}
				size='sm'
				onOpenChange={onOpenChange}
				isDismissable={false}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody className='text-center mt-6 select-none'>
								<H3>Unlock Premium Subscription</H3>
								<p className='text-gray-800'>
									Get unlimited access to all tests!
								</p>
								<H4 className='text-2xl text-warning'>
									Rs. {promo?.price ? promo?.price : 99}
								</H4>
								<p className='text-sm text-gray-800'>One-time payment!</p>
								<form className='flex gap-2' onSubmit={applyPromo}>
									<Input
										label='Promocode'
										// variant='flat'
										color='secondary'
										size='sm'
										value={promo?.value}
										onValueChange={handlePromo}
										{...(promo.error
											? {
													errorMessage: (
														<p className='text-left'>{promo?.error}</p>
													),
													isInvalid: !!promo?.error,
											  }
											: {
													description: promo?.price ? (
														<p className='text-success text-left'>
															Promocode "{promo.value}" applied
														</p>
													) : null,
											  })}
										//
									/>
									<Button
										variant='flat'
										color='secondary'
										size='sm'
										isDisabled={!promo.value}
										isLoading={isMutateLoading}
										className='h-12'
										onPress={applyPromo}
									>
										Apply
									</Button>
								</form>
							</ModalBody>
							<ModalFooter className='pt-1 pb-6'>
								<Button
									fullWidth
									className='!transition font-bold'
									variant='ghost'
									color='warning'
									isLoading={isLoading}
									onPress={() => {
										onBuyPremium()
									}}
								>
									Buy Plan
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<UpdateUserModal
				{...{
					isOpen: isOpenUser,
					onOpen: onOpenUser,
					onOpenChange: onOpenChangeUser,
					data,
				}}
			/>
		</>
	)
}
