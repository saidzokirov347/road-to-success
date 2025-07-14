import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/authContext/index.jsx'
import './index.css'
import { store } from './store/store.js'

function Root() {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/firebase-messaging-sw.js')
				.then(registration => {
					console.log(
						'Service Worker registered with scope:',
						registration.scope
					)
				})
				.catch(err => {
					console.log('Service Worker registration failed:', err)
				})
		}
	}, [])

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
