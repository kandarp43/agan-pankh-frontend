import React from 'react'

export default function Image({ ...props }) {
	return (
		<div className='w-32 ml-6 object-contain'>
			<img {...props} />
		</div>
	)
}
