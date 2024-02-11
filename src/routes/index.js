import AuthLayout from '../layout/auth'
import MainLayout from '../layout/main'
import Home from '../routes/home'
import Login from '../routes/login'
import TestsById from './testsById'

export const routes = [
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'test/:id',
				element: <TestsById />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]
