import React from 'react'
import HeaderBar from '../../components/navbar'
import { Outlet, Navigate } from 'react-router-dom'

export default function MainLayout() {
	const token = localStorage.getItem('token') || sessionStorage.getItem('token')
	if (!token) return <Navigate to='/login' replace />
	return (
		<>
			<HeaderBar />
			<Outlet />
		</>
	)
}
