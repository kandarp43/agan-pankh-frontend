import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBar from '../../components/navbar'

export default function AuthLayout() {
	return (
		<>
			<HeaderBar noAuth />
			<Outlet />
		</>
	)
}
