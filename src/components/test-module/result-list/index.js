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
									className='mb-2'
									label={
										<div>
											<p>
												Q{index + 1}. {que?.questionText}
											</p>
											{que?.queImage ? (
												<div className='hidden mt-2 ml-3 object-contain'>
													<img src={que?.queImage} alt={que?.questionText} />
												</div>
											) : null}
										</div>
									}
									key={que?.questionText}
									color='warning'
									value={que?.selectedOptionIndex}
								>
									{que?.options.map((option, i) => {
										return (
											<Radio
												key={option?.optionText}
												value={i}
												classNames={{ label: 'w-full max-w-full' }}
												className={`rounded-lg transition border-2 max-w-[calc(100%_-_6%)] w-full ${
													que?.selectedOptionIndex === i && !option.isCorrect
														? 'border-danger'
														: que?.selectedOptionIndex === i && option.isCorrect
														? 'border-success'
														: option.isCorrect
														? 'border-success'
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
													<div className='hidden mt-2 object-contain'>
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
								<Divider className='mb-4' />
							</>
						)
					})}
				</CardBody>
			</Card>
		</div>
	)
}
