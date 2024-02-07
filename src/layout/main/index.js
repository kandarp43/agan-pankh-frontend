import React from 'react'
import HeaderBar from '../../components/navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
	return (
		<>
			<HeaderBar />
			<Outlet />
		</>
	)
}
