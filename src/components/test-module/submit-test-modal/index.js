import React from 'react'

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Button,
	Card,
	CardBody,
} from '@nextui-org/react'

export default function SubmitTestModal({
	isOpen,
	onOpenChange,
	onSubmit,
	selectedAnswers,
	totalQuestions,
	timeRemaining,
}) {
	const data = {
		isAnswered: 0,
		isReviewed: 0,
		isNotVisited: totalQuestions - selectedAnswers.length,
	}

	selectedAnswers.forEach((ans) => {
		if (ans?.selectedOptionIndex >= 0) data.isAnswered += 1
		if (ans?.isReviewed) data.isReviewed += 1
	})

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader>Are you sure you want to submit the test?</ModalHeader>
						<ModalBody>
							<Card
								className={`leading-5 text-base transition rounded-md flex items-center bg-primary-100 text-primary font-bold`}
							>
								<CardBody>
									<div className='flex items-center justify-between'>
										<span>Time Remaining </span>
										<span>{timeRemaining}</span>
									</div>
								</CardBody>
							</Card>
							<Card
								className={`leading-5 text-base transition rounded-md flex items-center bg-success-100 text-success font-bold`}
							>
								<CardBody>
									<div className='flex items-center justify-between'>
										<span>Total Questions </span>
										<span>{totalQuestions}</span>
									</div>
								</CardBody>
							</Card>
							<Card
								className={`leading-5 text-base transition rounded-md flex items-center bg-warning-100 text-warning font-bold`}
							>
								<CardBody>
									<div className='flex items-center justify-between'>
										<span>Questions Answered </span>
										<span>{data.isAnswered}</span>
									</div>
								</CardBody>
							</Card>
							<Card
								className={`leading-5 text-base transition rounded-md flex items-center bg-gray-200 text-gray font-bold`}
							>
								<CardBody>
									<div className='flex items-center justify-between'>
										<span>Not visited Questions </span>
										<span>{data.isNotVisited}</span>
									</div>
								</CardBody>
							</Card>
							<Card
								className={`mb-1 leading-5 text-base transition rounded-md flex items-center bg-secondary-100 text-secondary font-bold`}
							>
								<CardBody>
									<div className='flex items-center justify-between'>
										<span>Marked for Review </span>
										<span>{data.isReviewed}</span>
									</div>
								</CardBody>
							</Card>
						</ModalBody>
						<ModalFooter>
							<Button
								fullWidth
								className='!transition font-bold'
								variant='ghost'
								color='secondary'
								onClick={onSubmit}
							>
								Submit Test
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
