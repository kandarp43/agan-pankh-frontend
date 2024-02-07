import React from 'react'

export function H1({ ...props }) {
	return (
		<h1
			{...props}
			className={`${props.className || ''} font-extrabold text-3xl`}
		>
			{props?.children}
		</h1>
	)
}
export function H2({ ...props }) {
	return (
		<h1 {...props} className={`${props.className || ''} font-bold text-3xl`}>
			{props?.children}
		</h1>
	)
}
export function H3({ ...props }) {
	return (
		<h1 {...props} className={`${props.className || ''} font-bold text-xl`}>
			{props?.children}
		</h1>
	)
}
export function H4({ ...props }) {
	return (
		<h1 {...props} className={`${props.className || ''} font-semibold text-lg`}>
			{props?.children}
		</h1>
	)
}
export function H5({ ...props }) {
	return (
		<h1 {...props} className={`${props.className || ''}`}>
			{props?.children}
		</h1>
	)
}
export function H6({ ...props }) {
	return (
		<h1 {...props} className={`${props.className || ''}`}>
			{props?.children}
		</h1>
	)
}
