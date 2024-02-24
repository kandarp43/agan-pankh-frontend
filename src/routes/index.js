import AuthLayout from '../layout/auth'
import MainLayout from '../layout/main'
import Home from '../routes/home'
import Login from '../routes/login'
import AboutUs from './about-us'
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
				path: ':type/:id',
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
			{
				path: 'about-us',
				element: <AboutUs />,
			},
		],
	},
]
