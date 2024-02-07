import React from 'react'
import { Chip } from '@nextui-org/react'
import { IconWrapper } from '../common/icon-wrapper'
import { LockIcon } from '../icons'
import { H3 } from '../common/heading'

export default function HeroSection() {
	return (
		<div className='py-4'>
			{/* <Chip></Chip> */}

			<Chip
				variant='shadow'
				classNames={{
					base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
					content: 'drop-shadow shadow-black text-white',
				}}
			>
				All Tests will be visible here once they are available
			</Chip>
			<H3 className='my-3'>GPSC Tests</H3>
			<ul>
				<li className='p-2 leading-5 text-base hover:bg-success-400/20 transition rounded-md flex items-center cursor-pointer hover:ring-1 hover:ring-success-500'>
					<span className='pe-2'>
						<IconWrapper className='bg-success/10 text-success'>
							<LockIcon className='text-lg ' />
						</IconWrapper>
					</span>
					<span className='pe-2'>
						New file New file New file New file New file New file New file New
						file New file New file New file New file New file New file New file
						New file New file New file
					</span>
				</li>
			</ul>
		</div>
	)
}
