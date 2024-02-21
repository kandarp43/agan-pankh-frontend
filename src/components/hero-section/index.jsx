import React, { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { IconWrapper } from '../common/icon-wrapper'
import { LockIcon, UnlockIcon } from '../icons'
import { H3 } from '../common/heading'
import { startTest, testsList } from '../../Query/tests/index.query'
import { Checkbox } from '@nextui-org/react'
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
	const [isConfirm, setConfirm] = useState(false)
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
		if (test?.testGiven && test?._id) {
			navigate(`/result/${test?._id}`)
		} else if (userData && !userData?.hasPreminum) {
			emitEvent('buyPlan')
		} else if (test?.isLocked && !test?.testGiven) {
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
		<div className='py-4 select-none'>
			<H3 className='my-3'>CCE TEST</H3>
			<Card
				className={`my-3 leading-5 text-base  border-2 border-warning-400 transition rounded-md flex items-center cursor-pointer`}
			>
				<CardBody
					className='overflow-visible bg-warning-500 hover:bg-warning-400 text-white transition delay-75'
					onClick={() => emitEvent('buyPlan')}
				>
					<li className={`flex items-center cursor-pointer`}>
						<div className='pe-2 flex flex-col sm:items-center sm:flex-row justify-between w-full font-semibold'>
							<span>
								Currently you haven't joined our premium plan, you can start
								giving Tests right after you subscribe to premium plan.
								<span className='cursor-pointer ml-2 text-xs py-0.5 px-2 rounded-md border border-white text-center'>
									Buy premium
								</span>
							</span>
						</div>
					</li>
				</CardBody>
			</Card>
			{isLoading ? (
				<div className='w-full flex items-center justify-center'>
					<CircularProgress color='secondary' aria-label='Loading...' />
				</div>
			) : null}
			<ul>
				{data?.map((test) => {
					return (
						<Card
							key={test?._id}
							className={`my-3 leading-5 text-base ${
								test?.testGiven && test?._id
									? 'bg-warning/10  ring-warning-500'
									: test?.isLocked
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
											<IconWrapper
												className={
													test?.testGiven && test?._id
														? 'bg-warning/20 text-warning'
														: 'bg-danger/10 text-danger'
												}
											>
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
													color='warning'
													variant='bordered'
													size='sm'
													classNames={{ content: 'text-sm' }}
												>
													Review your answers
												</Chip>
											) : null}
											{test?.testGiven ? (
												<Chip
													color='success'
													variant='bordered'
													size='sm'
													classNames={{ content: 'text-sm' }}
												>
													score: {test?.score}
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

			<Modal
				isOpen={isOpen}
				onOpenChange={(d) => {
					setConfirm(false)
					onOpenChange(d)
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								{selectedTest.current?.isOnGoing
									? 'Continue your Test'
									: 'Start your Test'}
							</ModalHeader>
							<ModalBody>
								<div>
									<p className='font-semibold'>
										{!selectedTest.current?.isOnGoing
											? 'You are about to start:'
											: null}
									</p>
									<Chip color='warning' variant='flat' radius='sm'>
										{selectedTest.current?.testName}
									</Chip>
								</div>
								{!selectedTest.current?.isOnGoing ? (
									<ul>
										<li className='leading-5 text-xs'>
											By clicking on "Start Test", Your test will be started and
											you will be redirected to test page.
										</li>
										<li className='leading-5 text-xs'>
											you will get 60 minutes to complete this test.
										</li>
										<li className='leading-5 text-xs'>
											After 60 minutes you will not be able to answer any of the
											questions.
										</li>
										{!selectedTest.current?.isOnGoing ? (
											<li className='mt-4'>
												<Checkbox
													size='md'
													color='secondary'
													isSelected={isConfirm}
													onValueChange={setConfirm}
													classNames={{ label: 'leading-3 font-bold text-xs' }}
												>
													I read all terms carefully and I agree to start the
													Test
												</Checkbox>
											</li>
										) : null}
									</ul>
								) : null}
							</ModalBody>
							<ModalFooter className='pt-1 pb-6'>
								<Button
									fullWidth
									isDisabled={
										!selectedTest.current?.isOnGoing ? !isConfirm : false
									}
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
