import axios from 'axios';
import {browserHistory} from 'react-router';
import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({email, password}) => dispatch => {
	// Submit email/password to the server

	axios.post(`${ROOT_URL}/signin`, {email, password})
	.then(response => {
		// If request is good...
		// Update state to indicate user is authenticated
		dispatch({
			type: AUTH_USER
		});
		// save the JWT token
		localStorage.setItem('token', response.data.token);
		// redirect to the route '/feature'
		browserHistory.push('/feature');
	})
	.catch(() => {
		// If request is bad
		// Show an error to the user
		dispatch(authError('Bad Login Info'));
	});
}

export const signupUser = ({email, password}) => dispatch => {
	axios.post(`${ROOT_URL}/signup`, {email, password})
		.then(response => {
			dispatch({
				type: AUTH_USER
			});

			localStorage.setItem('token', response.data.token);
			browserHistory.push('/feature');
		})
		.catch(response => {
			console.log('response: ', response.data);
			dispatch(authError('Email da dung'));
		}
		);
}

export const authError = error => ({
	type: AUTH_ERROR,
	payload: error
});

export const signoutUser = () => {
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER
	}
}