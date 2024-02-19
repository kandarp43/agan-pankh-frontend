import React from 'react'
import { H1 } from '../../common/heading'
import { Card, Chip, CardBody, RadioGroup, Radio } from '@nextui-org/react'

const shortTitle = {
	G: 'Gujarati',
	E: 'English',
	QA: 'Quantitative Aptitude',
	R: 'Reasoning',
}

export default function ResultList({ testData, questions }) {
	return (
		<div className='px-2 w-full h-fit'>
			<div className='flex sm:flex-row flex-col gap-y-2 sm:items-center justify-between'>
				<H1>{testData?.testName}</H1>
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
									className='mb-4'
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
									value={null}
								>
									{que?.options.map((option, i) => {
										return (
											<Radio
												key={option.optionText}
												value={i}
												classNames={{ label: 'w-full max-w-full' }}
												className={`rounded-lg transition border-2 max-w-[calc(100%_-_10%)] w-full ${
													'selected' ? 'border-warning' : ''
												} mb-2 ml-3`}
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
							</>
						)
					})}
				</CardBody>
			</Card>
		</div>
	)
}
