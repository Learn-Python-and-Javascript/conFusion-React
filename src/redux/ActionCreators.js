import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment,
})

export const postComment = (dishId, rating, comment) => (dispatch) => {
	const newComment = {
		dishId,
		rating,
		comment,
	}
	newComment.date = new Date().toISOString()

	const bearer = `Bearer ${localStorage.getItem('token')}`

	return fetch(`${baseUrl}comments`, {
		method: 'POST',
		body: JSON.stringify(newComment),
		headers: {
			'Content-Type': 'application/json',
			Authorization: bearer,
		},
		credentials: 'same-origin',
	})
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(
				`Error ${response.status}: ${response.statusText}`
			)
			error.response = response
			throw error
		}, (error) => {
			throw error
		})
		.then((response) => response.json())
		.then((response) => dispatch(addComment(response)))
		.catch((error) => {
			console.log('post comments', error.message)
			alert(`Your comment could not be posted\nError: ${error.message}`)
		})
}

export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading(true))

	return fetch(`${baseUrl}dishes`)
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(
				`Error ${response.status}: ${response.statusText}`,
			)
			error.response = response
			throw error
		}, (error) => {
			throw new Error(error.message)
		})
		.then((response) => response.json())
		.then((dishes) => dispatch(addDishes(dishes)))
		.catch((error) => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
	type: ActionTypes.DISHES_LOADING,
})

export const dishesFailed = (errmess) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmess,
})

export const addDishes = (dishes) => ({
	type: ActionTypes.ADD_DISHES,
	payload: dishes,
})

export const fetchComments = () => (dispatch) => fetch(`${baseUrl}comments`)
	.then((response) => {
		if (response.ok) {
			return response
		}
		const error = new Error(
			`Error ${response.status}: ${response.statusText}`,
		)
		error.response = response
		throw error
	}, (error) => {
		throw new Error(error.message)
	})
	.then((response) => response.json())
	.then((comments) => dispatch(addComments(comments)))
	.catch((error) => dispatch(commentsFailed(error.message)))

export const commentsFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errmess,
})

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
})

export const fetchPromos = () => (dispatch) => {
	dispatch(promosLoading())
	return fetch(`${baseUrl}promotions`)
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(
				`Error ${response.status}: ${response.statusText}`,
			)
			error.response = response
			throw error
		}, (error) => {
			throw new Error(error.message)
		})
		.then((response) => response.json())
		.then((promos) => dispatch(addPromos(promos)))
		.catch((error) => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
	type: ActionTypes.PROMOS_LOADING,
})

export const promosFailed = (errmess) => ({
	type: ActionTypes.PROMOS_FAILED,
	payload: errmess,
})

export const addPromos = (promos) => ({
	type: ActionTypes.ADD_PROMOS,
	payload: promos,
})

export const addLeaders = (leaders) => ({
	type: ActionTypes.ADD_LEADERS,
	payload: leaders,
})

export const fetchLeaders = () => (dispatch) => {
	dispatch(leadersLoading(true))
	return fetch(`${baseUrl}leaders`)
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(
				`Error ${response.status}: ${response.statusText}`,
			)
			error.response = response
			throw error
		}, (error) => {
			throw new Error(error.message)
		})
		.then((response) => response.json())
		.then((leaders) => dispatch(addLeaders(leaders)))
		.catch((error) => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
	type: ActionTypes.LEADERS_LOADING,
})

export const leadersFailed = (errmess) => ({
	type: ActionTypes.LEADERS_FAILED,
	payload: errmess,
})

export const addFeedback = (feedback) => ({
	type: ActionTypes.ADD_FEEDBACK,
	payload: feedback,
})

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
	const newFeedback = {
		firstname,
		lastname,
		telnum,
		email,
		agree,
		contactType,
		message,
	}
	newFeedback.date = new Date().toISOString()

	return fetch(`${baseUrl}feedback`, {
		method: 'POST',
		body: JSON.stringify(newFeedback),
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	})
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(
				`Error ${response.status}: ${response.statusText}`,
			)
			error.response = response
			throw error
		}, (error) => {
			throw error
		})
		.then((response) => response.json())
		.then((response) => dispatch(addFeedback(response)))
		.catch((error) => {
			console.log('post feedback', error.message)
			alert(`Your feedback could not be posted\nError: ${error.message}`)
		})
}

export const requestSignup = (cred) => ({
	type: ActionTypes.SIGNUP_REQUEST,
	cred,
})

export const receiveSignup = (response) => ({
	type: ActionTypes.SIGNUP_SUCCESS,
	token: response.token,
})

export const signupError = (message) => ({
	type: ActionTypes.SIGNUP_FAILURE,
	message,
})

export const signupUser = (cred) => (dispatch) => {
	dispatch(requestSignup(cred))

	return fetch(`${baseUrl}users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cred),
	})
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(`Error ${response.status}: ${response.statusText}`)
			error.response = response
			throw error
		}, (error) => {
			throw error
		})
		.then((response) => response.json())
		.then((response) => {
			if (response.success) {
				dispatch(receiveSignup(response))
			} else {
				const error = new Error(`Error ${response.status}`)
				error.response = response
				throw error
			}
		})
		.catch((error) => dispatch(signupError(error.message)))
}

export const requestLogin = (cred) => ({
	type: ActionTypes.LOGIN_REQUEST,
	cred,
})

export const receiveLogin = (response) => ({
	type: ActionTypes.LOGIN_SUCCESS,
	token: response.token,
})

export const loginError = (message) => ({
	type: ActionTypes.LOGIN_FAILURE,
	message,
})

export const loginUser = (cred) => (dispatch) => {
	dispatch(requestLogin(cred))

	return fetch(`${baseUrl}users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cred),
	})
		.then((response) => {
			if (response.ok) {
				return response
			}
			const error = new Error(`Error ${response.status}: ${response.statusText}`)
			error.response = response
			throw error
		}, (error) => {
			throw error
		})
		.then((response) => response.json())
		.then((response) => {
			if (response.success) {
				localStorage.setItem('token', response.token)
				localStorage.setItem('cred', JSON.stringify(cred))
				dispatch(receiveLogin(response))
			} else {
				const error = new Error(`Error ${response.status}`)
				error.response = response
				throw error
			}
		})
		.catch((error) => dispatch(loginError(error.message)))
}

export const requestLogout = () => ({
	type: ActionTypes.LOGOUT_REQUEST,
})

export const receiveLogout = () => ({
	type: ActionTypes.LOGOUT_SUCCESS,
})

export const logoutUser = () => (dispatch) => {
	dispatch(requestLogout())
	localStorage.removeItem('token')
	localStorage.removeItem('cred')
	dispatch(receiveLogout())
}
