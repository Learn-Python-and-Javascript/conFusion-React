import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createForms } from 'react-redux-form'
import Dishes from './dishes'
import Comments from './comments'
import Promotions from './promotions'
import Leaders from './leaders'
import Auth from './auth'
import Favorites from './favorites'
import InitialFeedback from './forms'

const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes,
			comments: Comments,
			promotions: Promotions,
			leaders: Leaders,
			auth: Auth,
			favorites: Favorites,
			...createForms({
				feedback: InitialFeedback,
			}),
		}),
		applyMiddleware(thunk, logger),
	)

	return store
}

export default ConfigureStore
