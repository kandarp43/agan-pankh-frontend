import AuthLayout from '../layout/auth'
import MainLayout from '../layout/main'
import Home from '../routes/home'
import Login from '../routes/login'

export const routes = [
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
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
