import React, { useMemo, useRef } from 'react'
import { Button } from '@nextui-org/react'

const colors = {
	isVisited: 'bg-danger-500 text-white border-danger-500',
	isAnswered: 'bg-success-500 text-white border-success-500',
	isNotVisited: 'bg-transparent text-warning border-warning',
	isReviewed: 'bg-primary text-white border-primary',
}

const shortTitle = {
	G: 'Gujarati',
	E: 'English',
	QA: 'Quantitative Aptitude',
	R: 'Reasoning',
}

function getStyle(data) {
	let className
	if (data?.isReviewed) {
		className = colors.isReviewed
	} else if (data?.selectedOptionIndex >= 0) {
		className = colors.isAnswered
	} else if (data?.isVisited) {
		className = colors.isVisited
	} else {
		className = colors.isNotVisited
	}
	return className
}

export default function TestSidebar({
	questions,
	selectedAnswers,
	isLoading,
	handleSubmit,
	gotoQuestion,
	closeModal,
}) {
	const indexRef = useRef(-1)
	const categoriesedQue = useMemo(() => {
		const categoriesed = []
		questions?.forEach((que) => {
			const Exist = categoriesed.findIndex((c) => c.key === que?.testSections)
			if (Exist >= 0) {
				categoriesed[Exist].value.push(que)
			} else {
				categoriesed.push({ key: que?.testSections, value: [que] })
			}
		})
		return categoriesed
	}, [])
	indexRef.current = -1
	return (
		<>
			<div className='min-h-[350px] h-[350px] sm:min-h-[calc(100vh_-_165px)] sm:h-[calc(100vh_-_165px)] overflow-y-auto'>
				{categoriesedQue?.map((cat) => {
					return (
						<>
							<h4 className='px-1 sm:px-4 py-1.5 font-bold'>
								{shortTitle?.[cat?.key] || 'NA'}
							</h4>
							<div className='flex flex-wrap px-1 sm:px-4 items-center content-baseline gap-3 sm:gap-5 w-72 sm:w-80  overflow-y-auto'>
								{cat?.value?.map((que) => {
									indexRef.current += 1
									const index = indexRef.current
									return (
										<div
											className={`transition h-8 w-8 sm:h-10 sm:w-10 rounded-lg self-center border flex items-center justify-center cursor-pointer ${getStyle(
												selectedAnswers.find(
													(selected) =>
														+selected.questionIndex === +que.questionIndex
												)
											)}`}
											key={index + 1}
											onClick={() => {
												gotoQuestion(que, index)
												typeof closeModal === 'function' && closeModal()
											}}
										>
											{index + 1}
										</div>
									)
								})}
							</div>
						</>
					)
				})}
			</div>
			<div className='px-5 pt-2'>
				<Button
					fullWidth
					isLoading={isLoading}
					onPress={handleSubmit}
					className='!transition font-bold sm:block hidden'
					variant='ghost'
					color='warning'
				>
					Submit Answers
				</Button>
			</div>
		</>
	)
}
