import React from 'react'
import { H1 } from '../../common/heading'
import {
	Divider,
	Card,
	Chip,
	CardBody,
	RadioGroup,
	Radio,
	Button,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const shortTitle = {
	G: 'Gujarati',
	E: 'English',
	QA: 'Quantitative Aptitude',
	R: 'Reasoning',
}

export default function ResultList({ testName, questions }) {
	const navigate = useNavigate()
	return (
		<div className='px-2 w-full h-fit'>
			<Button
				className='!transition font-bold mb-4'
				color='secondary'
				variant='flat'
				onPress={() => {
					navigate('/')
				}}
			>
				Goto home
			</Button>
			<div className='flex sm:flex-row flex-col mb-3 sm:items-center justify-between'>
				<H1>{testName}</H1>
			</div>
			<Card className='p-3 mb-4'>
				<CardBody className='p-0'>
					{questions?.map((que, index) => {
						let isAnsCorrect
						return (
							<>
								<div className='flex flex-col sm:flex-row sm:items-center w-full justify-between mb-2 select-none'>
									<Chip
										variant='shadow'
										color='warning'
										classNames={{ content: 'font-bold text-white' }}
										size='sm'
									>
										{shortTitle[que?.testSections]}
									</Chip>
								</div>
								<RadioGroup
									classNames={{
										label: 'font-bold text-black select-none w-full mb-3',
									}}
									className=''
									label={
										<div>
											<p className='flex'>
												<span className='mr-1'>Q{index + 1}. </span>
												<span
													dangerouslySetInnerHTML={{
														__html: `
														${que?.questionText?.replaceAll('\n', '<br />')}
													`,
													}}
												/>
											</p>
											{que?.queImage ? (
												<div className='mt-2 object-contain'>
													<img src={que?.queImage} alt={que?.questionText} />
												</div>
											) : null}
											{que?.specialImage ? (
												<div className='mt-2 object-contain'>
													<img
														src={que?.specialImage}
														alt={que?.questionText}
													/>
												</div>
											) : null}
										</div>
									}
									key={que?.questionText}
									color='warning'
									value={que?.selectedOptionIndex}
								>
									{que?.options.map((option, i) => {
										if (!isAnsCorrect) {
											isAnsCorrect =
												que?.selectedOptionIndex === i && option.isCorrect
										}
										return (
											<Radio
												key={option?.optionText}
												value={i}
												classNames={{
													label: 'w-full max-w-full',
													wrapper:
														que?.selectedOptionIndex === i && !option.isCorrect
															? 'border-danger'
															: que?.selectedOptionIndex === i &&
															  option.isCorrect
															? 'border-success'
															: option.isCorrect
															? 'border-success'
															: '',
												}}
												className={`rounded-lg transition border-2 max-w-[calc(100%_-_6%)] w-full font-semibold ${
													que?.selectedOptionIndex === i && !option.isCorrect
														? 'border-danger bg-danger-300'
														: que?.selectedOptionIndex === i && option.isCorrect
														? 'border-success bg-success-300'
														: option.isCorrect
														? 'border-success bg-success-300'
														: ''
												} mb-2 ml-2`}
												color={
													que?.selectedOptionIndex === i && !option.isCorrect
														? 'danger'
														: que?.selectedOptionIndex === i && option.isCorrect
														? 'success'
														: option.isCorrect
														? 'success'
														: 'default'
												}
											>
												<p>{option?.optionText}</p>
												{option?.optImage ? (
													<div className='mt-2 object-contain'>
														<img
															src={option?.optImage}
															alt={option?.optionText}
														/>
													</div>
												) : null}
											</Radio>
										)
									})}
								</RadioGroup>
								<Chip
									variant='flat'
									color={isAnsCorrect ? 'success' : 'danger'}
									className='mb-3 ml-3'
									classNames={{ content: 'font-bold' }}
									size='sm'
								>
									{isAnsCorrect ? 'correct' : 'incorrect'}
								</Chip>
								<Divider className='mb-4' />
							</>
						)
					})}
				</CardBody>
			</Card>
		</div>
	)
}
