import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/authContext/index.jsx'
import './index.css'
import { store } from './store/store.js'

function Root() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</Provider>
		</BrowserRouter>
	)
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Root />
	</StrictMode>
)
