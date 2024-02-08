import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { routes } from './routes'
import Toaster from './components/Toaster'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './Query'

const router = createBrowserRouter(routes)

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster limit={3} />
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
