import React, { useState } from 'react'
import { H1 } from '../../common/heading'
import { RadioGroup, Radio } from '@nextui-org/react'
import PremiumCard from '../../premium-card'

const questionData = [
	{
		question: 'What is the capital of France?',
		options: [
			{ label: 'Paris', value: 'paris' },
			{ label: 'London', value: 'london' },
			{ label: 'Berlin', value: 'berlin' },
			{ label: 'Rome', value: 'rome' },
		],
		correctAnswer: 'paris',
	},
	{
		question: 'What is the capital of india?',
		options: [
			{ label: 'Mumbai', value: 'mumbai' },
			{ label: 'Delhi', value: 'delhi' },
			{ label: 'Ahmedabad', value: 'ahmedabad' },
			{ label: 'Madhya Pradesh', value: 'madhya pradesh' },
		],
		correctAnswer: 'paris',
	},
	{
		question: 'What is the capital of France?',
		options: [
			{ label: 'Paris', value: 'paris' },
			{ label: 'London', value: 'london' },
			{ label: 'Berlin', value: 'berlin' },
			{ label: 'Rome', value: 'rome' },
		],
		correctAnswer: 'paris',
	},
]

export default function QuestionsList() {
	const [selectedAnswers, setSelectedAnswers] = useState([])

	const handleRadioChange = (value, questionIndex) => {
		console.log(value)
		setSelectedAnswers([
			...selectedAnswers.slice(0, questionIndex),
			value,
			...selectedAnswers.slice(questionIndex + 1),
		])
	}

	const handleSubmit = () => {
		// Do something with the selected answers, e.g., check them against correct answers and show feedback
		console.log('Selected answers:', selectedAnswers)

		// Reset for next set of questions
		setSelectedAnswers([])
	}

	return (
		<div>
			<PremiumCard />
			<H1>Multiple Choice Questions</H1>
			<ul className='que-main-list my-3'>
				{questionData?.map((que, index) => {
					return (
						<RadioGroup
							classNames={{ label: 'font-bold text-black select-none' }}
							className='mb-4'
							label={`Q${index + 1}. ${que.question}`}
							color='warning'
							value={selectedAnswers[index]}
							onValueChange={(value) => handleRadioChange(value, index)}
						>
							{que.options.map((option) => {
								return (
									<Radio key={option.value} value={option?.value}>
										{option?.label}
									</Radio>
								)
							})}
						</RadioGroup>
					)
				})}
			</ul>
		</div>
		// <Container css={{ maxWidth: '700px' }}>
		//   <Heading css={{ marginBottom: '$16' }}>Multiple Choice Questions</Heading>
		//   <List css={{ borderTop: '$gray$2' }}>
		//     {questionData.map((question, questionIndex) => (
		//       <ListItem key={questionIndex}>
		//         <List.Item css={{ display: 'flex', justifyContent: 'space-between' }}>
		//           <span>{question.question}</span>
		//           <Button size="sm" variant="auto">
		//             {questionIndex + 1} of {questionData.length}
		//           </Button>
		//         </List.Item>
		//         <RadioGroup
		//           value={selectedAnswers[questionIndex]}
		//           onChange={(value) => handleRadioChange(value, questionIndex)}
		//         >
		//           {question.options.map((option) => (
		//             <Radio key={option.value} value={option.value}>
		//               {option.label}
		//             </Radio>
		//           ))}
		//         </RadioGroup>
		//       </ListItem>
		//     ))}
		//   </List>
		//   <Button onPress={handleSubmit} css={{ marginTop: '$24' }}>
		//     Submit Answers
		//   </Button>
		// </Container>
	)
}
