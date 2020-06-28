import * as ActionTypes from './ActionTypes'

export const Auth = (state = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('token'),
	token: localStorage.getItem('token'),
	user: localStorage.getItem('cred') ? JSON.parse(localStorage.getItem('cred')) : null,
	errMess: null,
}, action) => {
	switch (action.type) {
	case ActionTypes.SIGNUP_REQUEST:
		return {
			...state,
			isLoading: true,
			isAuthenticated: false,
			user: action.cred,
		}
	case ActionTypes.SIGNUP_SUCCESS:
		return {
			...state,
			isLoading: false,
			isAuthenticated: false,
			errMess: '',
			token: action.token,
		}
	case ActionTypes.SIGNUP_FAILURE:
		return {
			...state,
			isLoading: false,
			isAuthenticated: false,
			errMess: action.message,
		}
	case ActionTypes.LOGIN_REQUEST:
		return {
			...state,
			isLoading: true,
			isAuthenticated: false,
			user: action.cred,
		}
	case ActionTypes.LOGIN_SUCCESS:
		return {
			...state,
			isLoading: false,
			isAuthenticated: true,
			errMess: '',
			token: action.token,
		}
	case ActionTypes.LOGIN_FAILURE:
		return {
			...state,
			isLoading: false,
			isAuthenticated: false,
			errMess: action.message,
		}
	case ActionTypes.LOGOUT_REQUEST:
		return {
			...state,
			isLoading: true,
			isAuthenticated: true,
		}
	case ActionTypes.LOGOUT_SUCCESS:
		return {
			...state,
			isLoading: false,
			isAuthenticated: false,
			token: '',
			user: null,
		}
	default:
		return state
	}
}
