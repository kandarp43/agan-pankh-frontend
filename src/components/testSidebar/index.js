import React from 'react'
import { Button } from '@nextui-org/react'

const colors = {
	isVisited: 'bg-danger-500 text-white border-danger-500',
	isAnswered: 'bg-success-500 text-white border-success-500',
	isNotVisited: 'bg-transparent text-warning border-warning',
	isReviewed: 'bg-primary text-white border-primary',
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
	return (
		<>
			<div className='flex flex-wrap p-1 sm:p-4 items-center content-baseline gap-3 sm:gap-5 w-72 sm:w-80 min-h-[350px] h-[350px] sm:min-h-[calc(100vh_-150px)] sm:h-[calc(100vh_-150px)] overflow-y-auto'>
				{questions.map((que, i) => {
					return (
						<div
							className={`transition h-8 w-8 sm:h-10 sm:w-10 rounded-lg self-center border flex items-center justify-center cursor-pointer ${getStyle(
								selectedAnswers.find(
									(selected) => selected.questionIndex === que.questionIndex
								)
							)}`}
							key={i + 1}
							onClick={() => {
								gotoQuestion(que, i)
								typeof closeModal === 'function' && closeModal()
							}}
						>
							{i + 1}
						</div>
					)
				})}
			</div>
			<div className='px-5'>
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
