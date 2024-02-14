import React, { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { IconWrapper } from '../common/icon-wrapper'
import { LockIcon, UnlockIcon } from '../icons'
import { H3 } from '../common/heading'
import { startTest, testsList } from '../../Query/tests/index.query'
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
import { Card, CardBody } from '@nextui-org/react'
import { emitEvent, toaster } from '../../helpers'

export default function HeroSection() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const selectedTest = useRef()
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { data: userData } = useQuery(
		['getUser'],
		() => queryClient.getQueryData('getUser'),
		{ select: (d) => d.data.data }
	)

	const { mutate: startTestApi } = useMutation(startTest)

	function onTestClick(test) {
		if (userData && !userData?.hasPreminum) {
			emitEvent('buyPlan')
		} else if (test?.isLocked) {
			toaster(
				'Please complete the previous test first to unlock new Test',
				'warning'
			)
		} else if (!test?.testGiven) {
			selectedTest.current = test
			onOpen()
		}
	}

	function onTestStart({ _id: id, isOnGoing }) {
		if (isOnGoing) {
			navigate(`/test/${id}`)
		} else {
			startTestApi(
				{ id, data: { testId: id } },
				{
					onSuccess: (data) => {
						navigate(`/test/${id}`)
					},
				}
			)
		}
	}

	const { data, isLoading } = useQuery(['getTestList'], testsList, {
		select: (d) => d?.data?.data?.data,
	})
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
					// test.isLocked = false
					return (
						<Card
							key={test?._id}
							className={`my-3 leading-5 text-base ${
								test?.isLocked
									? 'hover:bg-danger/10 hover:ring-danger-500'
									: 'hover:bg-success/10 hover:ring-success-500'
							} transition rounded-md flex items-center cursor-pointer hover:ring-1`}
						>
							<CardBody
								className='overflow-visible'
								onClick={() => onTestClick(test)}
							>
								<li className={`flex items-center cursor-pointer`}>
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
									<div className='pe-2 flex flex-col sm:items-center sm:flex-row justify-between w-full font-semibold'>
										<span>{test?.testName}</span>
										<div className='text-xs flex flex-col sm:flex-row sm:items-center gap-2'>
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
											{test?.isOnGoing ? (
												<Chip
													color='warning'
													variant='bordered'
													size='sm'
													classNames={{ content: 'text-sm' }}
												>
													Ongoing
												</Chip>
											) : null}
											<div className='text-sm flex sm:block text-zinc-800/70'>
												<p className='pe-2'>
													{test?.totalQuestions
														? `${test?.totalQuestions} Que's`
														: null}
												</p>
												<p>
													{test?.duration ? `${test?.duration} Mins` : null}
												</p>
											</div>
										</div>
									</div>
								</li>
							</CardBody>
						</Card>
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
										onTestStart(selectedTest.current)
									}}
								>
									{!selectedTest.current?.isOnGoing
										? 'Start Test'
										: 'Continue Test'}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
