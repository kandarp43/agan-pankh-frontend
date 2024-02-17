import React, { useEffect, useMemo, useState } from 'react'
import { H1 } from '../../common/heading'
import { RadioGroup, Radio } from '@nextui-org/react'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Card, Chip, CardBody } from '@nextui-org/react'
import { submitTest, submitTestAnswer } from '../../../Query/tests/index.query'
import { useNavigate } from 'react-router-dom'
import Timer from '../../TImer'
import TestSidebar from '../../testSidebar'
import Image from '../image'
import testingImage from '../../../assets/images/testingImage.jpeg'

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
				newSelected[isAnswerExist] = data
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
		// Do something with the selected answers, e.g., check them against correct answers and show feedback
		console.log('Selected answers:', selectedAnswers)
		submitAnswersApi(
			{ id: testId, data: { answers: selectedAnswers } },
			{
				onSuccess: () => {
					setSelectedAnswers([])
					navigate('/')
					queryClient.invalidateQueries('getTestList')
				},
			}
		)

		// Reset for next set of questions
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
	return (
		<div className='flex select-none'>
			<div className='px-2 w-full'>
				{/* <PremiumCard /> */}
				<div className='flex sm:flex-row flex-col gap-y-2 sm:items-center justify-between'>
					<H1>{testData?.testName}</H1>
					<Timer time={testSession?.endTime} onEnd={() => {}}></Timer>
				</div>
				<div className='que-main-list my-3 mb-16'>
					<Card className='p-3 mb-4'>
						<CardBody className='p-0'>
							{/* {getTestQue(0)?.map((que, index) => {
							return ( */}
							<div className='flex items-center w-full justify-between mb-2 select-none'>
								<Chip
									variant='shadow'
									color='warning'
									classNames={{ content: 'font-bold text-white' }}
									size='sm'
								>
									{shortTitle[que?.testSections]}
								</Chip>
								<Button
									isLoading={isLoading || isSubmitting}
									isDisabled={testData?.questions.length - 1 <= currentQue}
									onPress={() => {
										addRemoveReview(que, !isReviewed)
									}}
									className='!transition font-bold my-2 w-1/2 sm:w-fit'
									variant={isReviewed ? 'solid' : 'bordered'}
									size='sm'
									color='default'
								>
									{isReviewed ? 'Remove from Review' : 'Add to Review'}
								</Button>
							</div>
							<RadioGroup
								classNames={{
									label: 'font-bold text-black select-none w-full',
								}}
								className='mb-4'
								label={
									<>
										<p>
											Q{currentQue + 1}. {que?.questionText}
										</p>
										<div className='hidden my-2 sm:my-4 ml-3 object-contain'>
											<img src={testingImage} />
										</div>
									</>
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
											className={`rounded-lg border-2 max-w-[calc(100%_-_10%)] w-full ${
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
							isLoading={isLoading || isSubmitting}
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
							isLoading={isLoading || isSubmitting}
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
							onPress={handleSubmit}
							className='!transition font-bold'
							variant='ghost'
							color='warning'
						>
							Submit Answers
						</Button>
					</div>
				</div>
				<div className='w-full hidden h-16 fixed bottom-0 left-0 bg-white p-2 z-50  items-center justify-end'>
					<Button
						isLoading={isLoading || isSubmitting}
						onPress={handleSubmit}
						className='!transition font-bold w-80'
						variant='ghost'
						color='warning'
					>
						Submit Answers
					</Button>
				</div>
			</div>
			<div className='col-span-4 sm:block hidden'>
				<TestSidebar
					selectedAnswers={selectedAnswers}
					gotoQuestion={gotoQuestion}
					isLoading={isSubmitting}
					handleSubmit
					questions={testData?.questions}
				/>
			</div>
		</div>
	)
}
