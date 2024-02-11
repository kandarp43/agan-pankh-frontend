import React, { useRef } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { IconWrapper } from '../common/icon-wrapper'
import { LockIcon, UnlockIcon } from '../icons'
import { H3 } from '../common/heading'
import { testsList } from '../../Query/tests/index.query'
import {
	CircularProgress,
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react'
import { emitEvent } from '../../helpers'

export default function HeroSection() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const selectedTest = useRef()
	const navigate = useNavigate()

	function onTestClick(test) {
		if (test.isLocked) {
			emitEvent('buyPlan')
		} else if (!test?.testGiven) {
			selectedTest.current = test
			onOpen()
		}
	}

	function onTestStart(id) {
		navigate(`/test/${id}`)
	}

	const { data, isLoading } = useQuery(['getTestList'], testsList, {
		select: (d) => d?.data?.data?.data,
	})
	console.log(data)
	return (
		<div className='py-4'>
			<H3 className='my-3'>GPSC Tests</H3>
			{isLoading ? (
				<div className='w-full flex items-center justify-center'>
					<CircularProgress color='secondary' aria-label='Loading...' />
				</div>
			) : null}
			<ul>
				{data?.map((test) => {
					test.isLocked = false
					return (
						<li
							key={test?._id}
							onClick={() => onTestClick(test)}
							className={`p-2 leading-5 text-base ${
								test?.isLocked
									? 'hover:bg-danger/10 hover:ring-danger-500'
									: 'hover:bg-success/10 hover:ring-success-500'
							} transition rounded-md flex items-center cursor-pointer hover:ring-1`}
						>
							<span className='pe-2'>
								{test?.isLocked ? (
									<IconWrapper className='bg-danger/10 text-danger'>
										<LockIcon className='text-lg' />
									</IconWrapper>
								) : (
									<IconWrapper className='bg-success/10 text-success'>
										<UnlockIcon className='text-lg' />
									</IconWrapper>
								)}
							</span>
							<div className='pe-2 flex justify-between items-center w-full font-semibold'>
								<span>{test?.testName}</span>
								<div className='text-xs flex items-center gap-2'>
									{test?.testGiven ? (
										<Chip
											color='success'
											variant='bordered'
											size='sm'
											classNames={{ content: 'text-sm' }}
										>
											View Results
										</Chip>
									) : null}
									{test?.testRunning ? (
										<Chip
											color='success'
											variant='bordered'
											size='sm'
											classNames={{ content: 'text-sm' }}
										>
											Ongoing
										</Chip>
									) : null}
									<div className='text-xs'>
										<p>
											{test?.totalQuestions
												? `${test?.totalQuestions} Que's`
												: null}
										</p>
										<p>{test?.duration ? `${test?.duration} Mins` : null}</p>
									</div>
								</div>
							</div>
						</li>
					)
				})}
			</ul>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Start your Test
							</ModalHeader>
							<ModalBody>
								<div>
									<p className='font-semibold'>You are about to start:</p>
									<Chip color='warning' variant='flat' radius='sm'>
										{selectedTest.current?.testName}
									</Chip>
								</div>
								<ul>
									<li className='leading-5 text-xs	'>
										By clicking on "Start Test", Your test will be started and
										you will be redirected to test page.
									</li>
									<li className='leading-5 text-xs	'>
										you will get 60 minutes to complete this test.
									</li>
									<li className='leading-5 text-xs	'>
										After 60 minutes you will not be able to answer any of the
										questions.
									</li>
								</ul>
							</ModalBody>
							<ModalFooter className='pt-1 pb-6'>
								<Button
									fullWidth
									className='!transition font-bold'
									variant='ghost'
									color='secondary'
									onPress={() => {
										onClose()
										onTestStart(selectedTest.current?._id)
									}}
								>
									Start Test
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
