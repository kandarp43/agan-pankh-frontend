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
	ModalHeader,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react'

export default function HeaderBar({ noAuth }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	useEffect(() => {
		document.addEventListener('buyPlan', onOpen)
		return () => document.removeEventListener('buyPlan', onOpen)
	}, [])
	return (
		<>
			<Navbar isBordered maxWidth='full'>
				<div className='container mx-auto flex items-center justify-between'>
					<NavbarBrand>
						<p className='font-bold text-inherit'>Agan Pankh</p>
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
										src='https://i.pravatar.cc/150?u=a042581f4e29126704d'
									/>
								</DropdownTrigger>
								<DropdownMenu aria-label='Profile Actions' variant='flat'>
									<DropdownItem key='profile' isReadOnly className='h-14 gap-2'>
										<p className='font-semibold'>Signed in as</p>
										<p className='font-semibold'>exaample@example.com</p>
									</DropdownItem>
									<DropdownItem key='logout' color='danger'>
										Log Out
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</NavbarContent>
					) : null}
				</div>
			</Navbar>
			<div
				className='w-full sm:p-1 p-2 bg-yellow-500 px-6 cursor-default'
				onClick={onOpen}
			>
				<div className='container mx-auto flex items-center text-xs font-bold'>
					<span className='pr-2'>
						Currently you haven't joined our premium plan, you can start giving
						Tests right after you subscribe to premium plan
					</span>
					<span className='cursor-pointer text-xs py-0.5 px-2 rounded-md border border-black text-center'>
						Buy premium
					</span>
				</div>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Open this tests at only ₹499
							</ModalHeader>
							<ModalFooter className='pt-1 pb-6'>
								<Button
									fullWidth
									className='!transition font-bold'
									variant='ghost'
									color='secondary'
									onPress={onClose}
								>
									Buy Plan
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
