import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './routes/home'
import AuthLayout from './layout/auth'
import Login from './routes/login'
import MainLayout from './layout/main'

const router = createBrowserRouter([
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
])

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
