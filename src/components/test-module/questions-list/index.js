import React, { useMemo, useRef, useState } from 'react'
import { H1, H2 } from '../../common/heading'
import { RadioGroup, Radio } from '@nextui-org/react'
import { useMutation } from 'react-query'
import { groupBy } from '../../../helpers'
import { Button, Card, CardHeader, CardBody } from '@nextui-org/react'
import { submitTest, submitTestAnswer } from '../../../Query/tests/index.query'

const shortTitle = {
	G: 'Gujarati',
	E: 'English',
	QA: 'Quantitative Aptitude',
	R: 'Reasoning',
}

export default function QuestionsList({ testData, testId, isLoading }) {
	const counter = useRef(0)
	const [selectedAnswers, setSelectedAnswers] = useState([])
	const categorizedQuestions = useMemo(() => {
		let catQuestions = groupBy(testData?.questions, (que) => que?.testSections)
		const data = []
		for (const key in catQuestions) {
			data.push({ key: shortTitle[key], questionList: catQuestions[key] })
		}
		return data
	}, [testData?.testName])
	const { mutate } = useMutation(submitTestAnswer)
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

	const { mutate: submitAnswersApi } = useMutation(submitTest)

	const handleSubmit = () => {
		// Do something with the selected answers, e.g., check them against correct answers and show feedback
		console.log('Selected answers:', selectedAnswers)
		submitAnswersApi({ id: testId, data: { answers: selectedAnswers } })

		// Reset for next set of questions
		setSelectedAnswers([])
	}

	function selectedOption({ questionIndex, options }) {
		const selected = selectedAnswers?.find(
			(ans) => ans.questionIndex === questionIndex
		)?.selectedOptionIndex
		return selected >= 0 ? selected : ''
	}

	counter.current = 0
	return (
		<div className='px-2'>
			{/* <PremiumCard /> */}
			<H1>{testData?.testName}</H1>
			<ul className='que-main-list my-3'>
				{categorizedQuestions &&
					categorizedQuestions?.map((cat) => {
						return (
							<Card key={cat} className='p-3 mb-4'>
								<CardHeader className='bg-yellow-500 font-semibold rounded-large'>
									<H2>{cat?.key}</H2>
								</CardHeader>
								<CardBody>
									{cat?.questionList?.map((que) => {
										counter.current += 1
										return (
											<RadioGroup
												classNames={{
													label: 'font-bold text-black select-none',
												}}
												className='mb-4'
												label={`Q${counter.current}. ${que?.questionText}`}
												key={que?.questionText}
												color='warning'
												value={selectedOption(que)}
												onValueChange={(selectedOptionIndex) =>
													handleRadioChange({
														selectedOptionIndex,
														questionIndex: que.questionIndex,
													})
												}
											>
												{que?.options.map((option, i) => {
													return (
														<Radio key={option.optionText} value={i}>
															{option?.optionText}
														</Radio>
													)
												})}
											</RadioGroup>
										)
									})}
								</CardBody>
							</Card>
						)
					})}
			</ul>
			<Button
				isLoading={isLoading}
				onPress={handleSubmit}
				color='warning'
				variant='ghost'
			>
				Submit Answers
			</Button>
		</div>
	)
}
