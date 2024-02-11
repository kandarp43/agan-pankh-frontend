import { useEffect, useState } from 'react'
import { countDownCalculations, dateCheck } from '../../helpers'

const useTimer = (date, onEnd) => {
	const [timer, setTimer] = useState(
		date
			? countDownCalculations(dateCheck(date))
			: {
					days: '00',
					hours: '00',
					min: '00',
					sec: '00',
			  }
	)
	useEffect(() => {
		const intervalId = setInterval(() => {
			const startDate = countDownCalculations(dateCheck(date))
			if (
				startDate?.years <= 0 &&
				startDate?.days <= 0 &&
				startDate?.hours <= 0 &&
				startDate?.min <= 0 &&
				startDate?.sec <= 0
			) {
				onEnd(startDate)
				clearInterval(intervalId)
				setTimer(startDate)
			} else if (startDate) {
				setTimer(startDate)
			}
		}, 1000)
		return () => {
			clearInterval(intervalId)
		}
	}, [date])

	return {
		timer,
	}
}

export default useTimer
