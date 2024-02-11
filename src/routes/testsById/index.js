import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { testById } from '../../Query/tests/index.query'

export default function TestsById() {
	const { id } = useParams()
	const { data } = useQuery(['getTestById', id], () => testById(id), {
		enabled: !!id,
		select: (d) => d.data,
	})

	console.log(data)

	return <div>Tests By Id {id} </div>
}
