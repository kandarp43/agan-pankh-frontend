import React from 'react'
import useTimer from '../../hooks/useTimer'
import { Chip } from '@nextui-org/react'

export default function Timer({ time, onEnd }) {
	const { timer } = useTimer(
		time || 1708159655820,
		typeof onEnd === 'function' ? onEnd : () => {}
	)
	return (
		<Chip
			classNames={{ content: 'font-bold text-white' }}
			variant='shadow'
			size='lg'
			color={timer?.min > 20 ? 'warning' : 'danger'}
		>{`${timer?.hours}:${timer?.min}:${
			timer?.sec < 0 ? '00' : timer?.sec
		}`}</Chip>
	)
}
