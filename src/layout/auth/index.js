import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import HeaderBar from '../../components/navbar'

export default function AuthLayout() {
	const token = localStorage.getItem('token') || sessionStorage.getItem('token')
	const location = useLocation()
	const redirect = location?.pathname === '/' ? location?.pathname : '/'
	if (token) return <Navigate to={redirect} replace />
	return (
		<>
			<HeaderBar noAuth />
			<Outlet />
		</>
	)
}
