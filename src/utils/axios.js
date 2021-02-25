import axios from 'axios';

export const baseUrl = 'http://localhost:8080/';
export const tmdbUrl = 'https://image.tmdb.org/t/p/w500';

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('accessToken')
			? 'Bearer ' + localStorage.getItem('accessToken')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

export default axiosInstance;

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	console.log(response);
    return response;
}, function (error) {
	console.log(error);
	const originalRequest = error.config;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error

	// if we already have a refresh token and our access token failed, try to refresh it
	const accessToken = localStorage.getItem('accessToken');
	// check if refresh token is expired
	if (accessToken) {
		const jwtExpiration = JSON.parse(atob(accessToken.split('.')[1])).exp;
		const now = Math.ceil(Date.now() / 1000);
		if (jwtExpiration < now) {
			localStorage.removeItem('accessToken');
			return Promise.reject(error);
		}
	}
	
	if (error.response.status === 401 && accessToken) {
		axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
		originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
		return axiosInstance(originalRequest);
	}
	
	// if we don't have a refresh token and our access token failed, just return the error and we need to log the user out
	return Promise.reject(error);
});
