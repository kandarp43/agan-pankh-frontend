import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { testById } from '../../Query/tests/index.query'
import QuestionsList from '../../components/test-module/questions-list'
import { CircularProgress } from '@nextui-org/react'
import { toaster } from '../../helpers'
import { useNavigate } from 'react-router-dom'

export default function TestsById() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading } = useQuery(
		['getTestById', id],
		() => testById(id),
		{
			enabled: !!id,
			select: (d) => d.data,
			onError: (err) => {
				toaster(err.response.data.error)
				navigate('/')
			},
		}
	)
	return (
		<div className='my-4 sm:px-4 px-0 mx-1 '>
			{isLoading ? (
				<div className='w-full flex items-center justify-center'>
					<CircularProgress color='secondary' aria-label='Loading...' />
				</div>
			) : null}
			{data?.test ? (
				<QuestionsList
					key={id}
					testSession={data?.testSession}
					testData={data?.test}
					attempted={data?.questionsAttempted}
					testId={id}
					isLoading={isLoading}
				/>
			) : null}
		</div>
	)
}
