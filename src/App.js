import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './components/Main'
import ConfigureStore from './redux/configureStore'

const store = ConfigureStore()

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Main />
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
