import React, { useEffect } from 'react'
import {
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
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../../helpers'
import { createPayment } from '../../Query/payment/index.query'
import UpdateUserModal from '../updateUserModal'
import logo from '../../assets/images/agan-pankh.png'

export default function HeaderBar({ noAuth }) {
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
	useEffect(() => {
		document.addEventListener('buyPlan', onOpen)
		return () => document.removeEventListener('buyPlan', onOpen)
	}, [])

	function onBuyPremium() {
		mutate()
	}

	function logout() {
		removeToken()
		navigate('/login')
	}
	return (
		<>
			<Navbar isBordered maxWidth='full'>
				<div className='container mx-auto flex items-center justify-between'>
					<NavbarBrand className='cursor-pointer' onClick={() => navigate('/')}>
						<img src={logo} alt='logo' className='h-12' />
						<p className='pl-2 font-bold text-inherit'>AganPankh</p>
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
							<Dropdown placement='bottom-end'>
								<DropdownTrigger>
									<Avatar
										isBordered
										as='button'
										className='transition-transform'
										color='secondary'
										name='Jason Hughes'
										size='sm'
										src='https://i.pravatar.cc/150?u=a042581s4e29126704d'
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
			{!noAuth && data && 'hasPreminum' in data && !data?.hasPreminum ? (
				<div
					className='w-full sm:p-1 p-2 bg-yellow-500 px-6 cursor-default'
					onClick={onOpen}
				>
					<div className='container mx-auto flex items-center text-xs font-bold'>
						<span className='pr-2'>
							Currently you haven't joined our premium plan, you can start
							giving Tests right after you subscribe to premium plan
						</span>
						<span className='cursor-pointer text-xs py-0.5 px-2 rounded-md border border-black text-center'>
							Buy premium
						</span>
					</div>
				</div>
			) : null}
			<Modal
				isOpen={isOpen}
				size='sm'
				onOpenChange={onOpenChange}
				isDismissable={false}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody className='text-center'>
								<H3>Unlock Premium Subscription</H3>
								<p className='text-gray-800'>
									Get unlimited access to all tests!
								</p>
								<H4 className='text-2xl text-warning'>Rs. 49</H4>
								<p className='text-sm text-gray-800'>One-time payment!</p>
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
