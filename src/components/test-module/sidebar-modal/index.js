import React from 'react'

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

export default function SidebarModal({ isOpen, onOpenChange, children }) {
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			classNames={{ backdrop: 'sm:hidden', base: 'sm:hidden' }}
		>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Goto Question
						</ModalHeader>
						<ModalBody className='mx-0 flex items-center justify-center'>
							{children}
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
