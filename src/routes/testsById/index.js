import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { resultById, testById } from '../../Query/tests/index.query'
import QuestionsList from '../../components/test-module/questions-list'
import { CircularProgress } from '@nextui-org/react'
import { toaster } from '../../helpers'
import { useNavigate } from 'react-router-dom'
import ResultList from '../../components/test-module/result-list'

export default function TestsById() {
	const { id, type } = useParams()
	const isTest = type === 'test'
	const isResult = type === 'result'
	const navigate = useNavigate()
	useEffect(() => {
		if (type !== 'test' && type !== 'result') {
			navigate('/')
		}
	}, [type, id])
	const { data, isLoading } = useQuery(
		['getTestById', id, isTest],
		() => testById(id),
		{
			enabled: !!id && isTest,
			select: (d) => d?.data,
			onError: (err) => {
				toaster(err.response.data.error)
				navigate('/')
			},
		}
	)
	const { data: resultData, isLoading: isResultLoading } = useQuery(
		['getResultById', id, isResult],
		() => resultById(id),
		{
			enabled: !!id && isResult,
			select: (d) => d?.data,
			onError: (err) => {
				toaster(err.response.data.error)
				navigate('/')
			},
		}
	)
	return (
		<>
			<div className='my-2 mt-4 sm:px-4 px-0 mx-1 '>
				{isLoading || isResultLoading ? (
					<div className='w-full flex items-center justify-center'>
						<CircularProgress color='secondary' aria-label='Loading...' />
					</div>
				) : null}
				{data?.test && isTest ? (
					<QuestionsList
						key={id}
						testSession={data?.testSession}
						testData={data?.test}
						attempted={data?.questionsAttempted}
						testId={id}
						isLoading={isLoading}
					/>
				) : null}
				{resultData?.testName && isResult && (
					<ResultList
						questions={resultData.questions}
						testName={resultData?.testName}
					/>
				)}
			</div>
		</>
	)
}
