import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { testById } from '../../Query/tests/index.query'
import QuestionsList from '../../components/test-module/questions-list'

export default function TestsById() {
	const { id } = useParams()
	const { data } = useQuery(['getTestById', id], () => testById(id), {
		enabled: !!id,
		select: (d) => d.data,
	})

	return (
		<div className='my-4 px-4 sm:px-0 container mx-auto'>
			<QuestionsList key={id} testData={data?.data?.data} testId={id} />
		</div>
	)
}
