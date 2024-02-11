/* eslint-disable no-restricted-globals */
import { queryClient } from '../Query'

export function verifyLength(value, length) {
	return value.length >= length
}

export function formatDate(date, separator = '-') {
	const d = new Date(date).toString().split(' ')
	return date ? [d[2], months[d[1]], d[3]].join(separator) : '-'
}

export const months = {
	Jan: 1,
	Feb: 2,
	Mar: 3,
	Apr: 4,
	May: 5,
	Jun: 6,
	Jul: 7,
	Aug: 8,
	Sep: 9,
	Oct: 10,
	Nov: 11,
	Dec: 12,
}

export function checkLength(data = '') {
	if (data?.trim()?.length !== 0) return false
	return true
}

export function removeSpaces(data) {
	return data?.trim()
}

export const addQueryParams = (value) => {
	const data = { ...value }
	Object.keys(data).forEach(
		(e) =>
			(data[e] === '' ||
				typeof data[e] === 'object' ||
				!data[e]?.toString().length) &&
			delete data[e]
	)
	return new URLSearchParams(data)?.toString()
}

export function checkObjectId(id) {
	return /^[a-f\d]{24}$/i.test(id)
}

export function removeToken() {
	localStorage.clear('')
	sessionStorage.clear('')
}

export function addToken(token, remember) {
	if (remember) {
		localStorage.setItem('token', token)
	} else {
		sessionStorage.setItem('token', token)
	}
}

export const appendParams = (value) => {
	const data = { ...value }
	data.search = encodeURIComponent(data?.search || '')
	Object.keys(data).forEach(
		(e) =>
			(data[e] === '' ||
				typeof data[e] === 'object' ||
				!data[e]?.toString().length) &&
			delete data[e]
	)

	window.history.replaceState(
		{},
		null,
		`${location.pathname}?${new URLSearchParams(data).toString()}`
	)
}

export const parseParams = (params = '') => {
	const urlParams = new URLSearchParams(decodeURIComponent(params))
	const rawParams = decodeURIComponent(params).replace('?', '').split('&')

	const extractedParams = {}
	if (rawParams[0]) {
		rawParams.forEach((item) => {
			item = item.split('=')
			extractedParams[item[0]] = urlParams.get(item[0])
				? urlParams.get(item[0])
				: ''
		})
		return extractedParams
	} else {
		return extractedParams
	}
}

export function handleAlterImage(e, src) {
	e.target.onerror = null
	e.target.src = src
}

export function getSortedColumns(TableColumns, urlData) {
	return TableColumns?.map((column) =>
		column.connectionName === urlData?.sort
			? {
					...column,
					sort:
						urlData?.order === 'asc' ? 1 : urlData?.order === 'desc' ? -1 : 0,
			  }
			: column
	)
}

export function blobImage(url) {
	const data = fetch(url)
	const blob = data.blob()

	const nUrl = URL.createObjectURL(blob)
	return nUrl
}

export function toaster(message, type = 'success') {
	queryClient.defaultOptions.message(message, type)
}

export function randomColor() {
	return `hsl(${Math.ceil(Math.random() * 360 + 1)}, 65%, 65%)`
}

export function imageAppendUrl(url) {
	return '' + url
}

export function timeSelect() {
	let time = []
	let minute = ['00', '15', '30', '45']
	for (let i = 0; i < 24; i++) {
		minute.forEach((m) =>
			time.push({
				sName: String(i).padStart(2) + ':' + m,
				_id: String(i).padStart(2) + ':' + m,
			})
		)
	}
	return time
}

export function hourSelect(min = 1, max = 24) {
	let time = []
	for (let i = min; i <= max; i++) {
		time.push({ sName: i + (i === 1 ? ' Hr' : ' Hrs'), _id: i })
	}
	return time
}

export function cell(data, optionalText = '-') {
	return data || optionalText
}

export function handleErrors(errors, errorSetter) {
	errors?.forEach((error) => {
		errorSetter(error.param, { type: 'custom', message: error.msg })
	})
}
export function changeDateFormat(date) {
	return date?.substring(0, 10)
}

export const bottomReached = ({ target }) => {
	return target.offsetHeight + target.scrollTop >= target.scrollHeight
}

export function countHoursEquality(totalHours, expectedHours) {
	return +totalHours === +expectedHours
}
export function countDiff(totalHours, usedHours) {
	return +totalHours - +usedHours
}

export function convertMinutesToTime(min) {
	let hours = 0,
		days = 0,
		minutes = 0
	days = parseInt(min / 1440)
	hours = parseInt((min % 1440) / 60)
	minutes = parseInt((min % 1440) % 60)

	return `${days ? days + 'd' : ''} ${hours}h ${minutes}m`
}

export function emitEvent(type, detail = {}, elem = document) {
	if (!type) return

	let event = new CustomEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: detail,
	})

	return elem.dispatchEvent(event)
}

export const countDownCalculations = (dateData) => {
	let diff =
		(Date.parse(new Date(Number(dateData))) - Date.parse(new Date())) / 1000
	const timeLeft = {
		years: 0,
		days: 0,
		hours: 0,
		min: 0,
		sec: 0,
		millisec: 0,
	}

	if (diff >= 365.25 * 86400) {
		timeLeft.years = Math.floor(diff / (365.25 * 86400))
		diff -= timeLeft.years * 365.25 * 86400
	}
	if (diff >= 86400) {
		timeLeft.days = Math.floor(diff / 86400)
		diff -= timeLeft.days * 86400
	}
	if (diff >= 3600) {
		timeLeft.hours = Math.floor(diff / 3600)
		diff -= timeLeft.hours * 3600
	}
	if (diff >= 60) {
		timeLeft.min = Math.floor(diff / 60)
		diff -= timeLeft.min * 60
	}
	timeLeft.sec = diff
	return timeLeft
}

export const dateCheck = (data) => {
	if (isNaN(Number(data))) {
		return new Date(data)
	} else {
		return new Date(Number(data))
	}
}
