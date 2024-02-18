import React, { useEffect, useMemo, useState } from 'react'
import { H1 } from '../../common/heading'
import { RadioGroup, Radio } from '@nextui-org/react'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Card, Chip, CardBody, useDisclosure } from '@nextui-org/react'
import { submitTest, submitTestAnswer } from '../../../Query/tests/index.query'
import { useNavigate } from 'react-router-dom'
import Timer from '../../TImer'
import TestSidebar from '../../testSidebar'
import Image from '../image'
import testingImage from '../../../assets/images/testingImage.jpeg'
import SubmitTestModal from '../submit-test-modal'
import SidebarModal from '../sidebar-modal'
import { toaster } from '../../../helpers'

const shortTitle = {
	G: 'Gujarati',
	E: 'English',
	QA: 'Quantitative Aptitude',
	R: 'Reasoning',
}

export default function QuestionsList({
	testData,
	testSession,
	testId,
	isLoading,
	attempted,
}) {
	const [selectedAnswers, setSelectedAnswers] = useState(
		attempted?.length ? attempted : []
	)

	const [currentQue, setCurrentQue] = useState(0)
	const { mutate } = useMutation(submitTestAnswer)

	useEffect(() => {
		const isExisted = attempted.find((attempt) => {
			return +attempt.questionIndex === 1
		})
		if (!isExisted && !isExisted?.isVisited) {
			const data = { questionIndex: 1, isVisited: true }
			mutate({ id: testId, data })
			setSelectedAnswers([...selectedAnswers, data])
		}
	}, [])

	const handleRadioChange = (data) => {
		const isAnswerExist = selectedAnswers.findIndex(
			(que) => +que?.questionIndex === +data?.questionIndex
		)
		if (isAnswerExist >= 0) {
			setSelectedAnswers((selectedAnswers) => {
				const newSelected = selectedAnswers.slice()
				if (
					newSelected[isAnswerExist].selectedOptionIndex !==
					data.selectedOptionIndex
				) {
					mutate({ id: testId, data })
				}
				newSelected[isAnswerExist] = { ...newSelected[isAnswerExist], ...data }
				return newSelected
			})
		} else {
			mutate({ id: testId, data })
			setSelectedAnswers([...selectedAnswers, data])
		}
	}

	const { mutate: submitAnswersApi, isLoading: isSubmitting } =
		useMutation(submitTest)

	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const handleSubmit = () => {
		submitAnswersApi(
			{ id: testId, data: { answers: selectedAnswers } },
			{
				onSuccess: () => {
					navigate('/')
					setSelectedAnswers([])
					toaster('Test has been submitted successfully')
					queryClient.invalidateQueries('getTestList')
				},
				onError: () => {
					toaster('Test has been submitted successfully', '')
				},
			}
		)
	}

	function selectedOption(questionIndex) {
		const selected = selectedAnswers?.find(
			(ans) => ans.questionIndex === questionIndex
		)?.selectedOptionIndex
		return selected >= 0 ? selected : ''
	}

	function getTestQue(numberOfQue) {
		return testData?.questions[numberOfQue]
	}

	function addRemoveReview(data, isAdd) {
		console.log(data, isAdd)
		const isAnswerExist = selectedAnswers.findIndex(
			(que) => +que?.questionIndex === +data?.questionIndex
		)
		if (isAnswerExist >= 0) {
			setSelectedAnswers((selectedAnswers) => {
				const newSelected = selectedAnswers.slice()
				const reqData = {
					...newSelected[isAnswerExist],
					isReviewed: isAdd,
				}

				mutate({
					id: testId,
					data: reqData,
				})

				newSelected[isAnswerExist] = reqData
				return newSelected
			})
		} else {
			const reqData = { ...data, isReviewed: isAdd }
			mutate({ id: testId, data: reqData })
			setSelectedAnswers([...selectedAnswers, reqData])
		}
		// call isReviewed
	}

	function gotoQuestion(data, index) {
		console.log({ index, data })
		setCurrentQue(index)
		const isAnswerExist = selectedAnswers.findIndex(
			(que) => +que?.questionIndex === +data?.questionIndex
		)
		if (isAnswerExist >= 0) {
			setSelectedAnswers((selectedAnswers) => {
				const newSelected = selectedAnswers.slice()
				const reqData = {
					...newSelected[isAnswerExist],
					isVisited: true,
				}
				if (!newSelected[isAnswerExist].isVisited) {
					mutate({
						id: testId,
						data: reqData,
					})
				}
				newSelected[isAnswerExist] = reqData
				return newSelected
			})
		} else {
			const reqData = { ...data, isVisited: true }
			mutate({ id: testId, data: reqData })
			setSelectedAnswers([...selectedAnswers, reqData])
		}
		// call isVisited
	}

	const que = useMemo(() => getTestQue(currentQue), [testId, currentQue])
	const isReviewed =
		selectedAnswers.findIndex(
			(ans) => que?.questionIndex === ans?.questionIndex && ans.isReviewed
		) >= 0

	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const {
		isOpen: isSubmitOpen,
		onOpen: onSubmitOpen,
		onOpenChange: onSubmitOpenChange,
	} = useDisclosure()
	return (
		<div className='flex select-none'>
			<div className='px-2 w-full h-fit'>
				{/* <PremiumCard /> */}
				<div className='flex sm:flex-row flex-col gap-y-2 sm:items-center justify-between'>
					<H1>{testData?.testName}</H1>
					<Timer time={testSession?.endTime} onEnd={handleSubmit}></Timer>
				</div>
				<div className='que-main-list my-3 mb-16'>
					<Card className='p-3 mb-4'>
						<CardBody className='p-0'>
							{/* {getTestQue(0)?.map((que, index) => {
							return ( */}
							<div className='flex flex-col sm:flex-row sm:items-center w-full justify-between mb-2 select-none'>
								<Chip
									variant='shadow'
									color='warning'
									classNames={{ content: 'font-bold text-white' }}
									size='sm'
								>
									{shortTitle[que?.testSections]}
								</Chip>
								<div className='flex gap-2'>
									<Button
										onPress={() => {
											addRemoveReview(que, !isReviewed)
										}}
										className='!transition font-bold my-2 w-fit'
										variant={isReviewed ? 'solid' : 'bordered'}
										size='sm'
										color='default'
									>
										{isReviewed ? 'Remove from Review' : 'Add to Review'}
									</Button>
									<Button
										onPress={onOpen}
										className='!transition font-bold my-2 w-fit block sm:hidden'
										variant={'bordered'}
										size='sm'
										color='default'
									>
										question map
									</Button>
								</div>
							</div>
							<RadioGroup
								classNames={{
									label: 'font-bold text-black select-none w-full mb-3',
								}}
								className='mb-4'
								label={
									<div classN>
										<p>
											Q{currentQue + 1}. {que?.questionText}
										</p>
										<div className='hidden mt-2 ml-3 object-contain'>
											<img src={testingImage} />
										</div>
									</div>
								}
								key={que?.questionText}
								color='warning'
								value={selectedOption(que?.questionIndex)}
								onValueChange={(selectedOptionIndex) =>
									handleRadioChange({
										selectedOptionIndex,
										questionIndex: que.questionIndex,
									})
								}
							>
								{que?.options.map((option, i) => {
									return (
										<Radio
											key={option.optionText}
											value={i}
											classNames={{ label: 'w-full max-w-full' }}
											className={`rounded-lg transition border-2 max-w-[calc(100%_-_10%)] w-full ${
												selectedOption(que?.questionIndex) === i
													? 'border-warning'
													: ''
											} mb-2 ml-3`}
										>
											<p>{option?.optionText}</p>
											<div className='hidden mt-2 object-contain'>
												<img src={testingImage} />
											</div>
										</Radio>
									)
								})}
							</RadioGroup>
							{/* )
						})} */}
						</CardBody>
					</Card>
					<div className='flex items-center gap-x-2 justify-between w-full'>
						<Button
							isDisabled={currentQue <= 0}
							onPress={() => {
								gotoQuestion(getTestQue(currentQue - 1), currentQue - 1)
							}}
							className='!transition font-bold my-2 w-1/2 sm:w-fit'
							variant='bordered'
							color='secondary'
						>
							Previous
						</Button>
						<Button
							isDisabled={testData?.questions.length - 1 <= currentQue}
							onPress={() => {
								gotoQuestion(getTestQue(currentQue + 1), currentQue + 1)
							}}
							className='!transition font-bold my-2 w-1/2 sm:w-fit'
							variant='bordered'
							color='secondary'
						>
							Next
						</Button>
					</div>
					<div className='sm:hidden flex items-center justify-center w-full'>
						<Button
							fullWidth
							isLoading={isLoading || isSubmitting}
							onPress={onSubmitOpen}
							className='!transition font-bold'
							variant='ghost'
							color='warning'
						>
							Submit Answers
						</Button>
					</div>
				</div>
			</div>
			<div className='col-span-4 sm:block hidden h-fit'>
				<TestSidebar
					selectedAnswers={selectedAnswers}
					gotoQuestion={gotoQuestion}
					isLoading={isSubmitting}
					handleSubmit={onSubmitOpen}
					questions={testData?.questions}
				/>
			</div>
			<SubmitTestModal
				onOpenChange={onSubmitOpenChange}
				isOpen={isSubmitOpen}
				onSubmit={handleSubmit}
				selectedAnswers={selectedAnswers}
				timeRemaining={<Timer time={testSession?.endTime} />}
				totalQuestions={testData?.questions?.length}
			/>

			<SidebarModal onOpenChange={onOpenChange} isOpen={isOpen}>
				<TestSidebar
					closeModal={onOpenChange}
					selectedAnswers={selectedAnswers}
					gotoQuestion={gotoQuestion}
					isLoading={isSubmitting}
					questions={testData?.questions}
				/>
			</SidebarModal>
		</div>
	)
}
