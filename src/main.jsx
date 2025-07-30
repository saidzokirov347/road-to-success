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

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<StrictMode>
		<Root />
	</StrictMode>
)

const removeLoader = () => {
	const loader = document.getElementById('custom-loader')
	if (loader) {
		loader.classList.add('fade-out')
		setTimeout(() => loader.remove(), 300)
	}
}

if ('requestIdleCallback' in window) {
	requestIdleCallback(removeLoader)
} else {
	setTimeout(removeLoader, 500)
}
