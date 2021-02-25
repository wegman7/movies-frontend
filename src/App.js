import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import axiosInstance from './utils/axios';

import Login from './unauthenticated/components/auth/Login';
import Signup from './unauthenticated/components/auth/Signup';
import HomeContainerPublic from './unauthenticated/components/Home/index';
import HomeContainerPrivate from './authenticated/components/Home/index';
import { getUserDetails } from './utils/apiCalls';
import createNotification from './utils/alerts';
import NavbarPublic from './unauthenticated/components/Navbar';
import NavbarPrivate from './authenticated/components/Navbar';
import MoviesPrivate from './authenticated/components/Movies/index';

import './App.css';
import 'react-notifications/lib/notifications.css';

const PublicRoutes = (props) => {
	return (
		<>
			<Route exact path='/'>
				<Redirect to='/home/' />
			</Route>
			<Route path='/' render={(routeProps) => <NavbarPublic {...props} {...routeProps} />} />
			<Route exact path='/home/' render={(routeProps) => <HomeContainerPublic {...props} {...routeProps} />} />
			<Route exact path='/login/' render={(routeProps) => <Login {...props} {...routeProps} />} />
			<Route exact path='/signup/' component={Signup} />
		</>
	);
}

const PrivateRoutes = (props) => {
	return (
		<>
			<Route exact path='/'>
				<Redirect to='/home/' />
			</Route>
			<Route path='/' render={(routeProps) => <NavbarPrivate {...props} {...routeProps} />} />
			<Route exact path='/home/' render={(routeProps) => <HomeContainerPrivate {...props} {...routeProps} />} />
			<Route exact path='/movies/' render={(routeProps) => <MoviesPrivate user={props.user} {...routeProps} />} />
		</>
	);
}

const App = (props) => {
	
	const [user, setUser] = useState({ username: null, id: null, avatarUrl: null, isAuthenticated: false, loading: true });

	const loadUser = () => {
		if (localStorage.getItem('accessToken')) {
			getUserDetails()
				.then(result => {
					console.log(result);
					setUser({ ...user, id: result.data.id, isAuthenticated: true, loading: false });
				})
				.catch(error => {
					console.log(error);
					setUser({ ...user, loading: false });
				});
		} else {
			setUser({ ...user, loading: false });
		}
	}

	useEffect(() => {
		loadUser();
	}, []);
	
	const handleLogin = () => {
		axiosInstance.defaults.headers['Authorization'] = localStorage.getItem('accessToken');
		loadUser();
		props.history.push('/');
	}

	const handleLogout = () => {
		localStorage.clear();
		axiosInstance.defaults.headers['Authorization'] = null;
		setUser({ ...user, username: null, avatarUrl: null, isAuthenticated: false })
		createNotification('info', 'You have been logged out.');
		props.history.push('/');
	}

	if (user.loading) {
		return(
			<>
				<CircularProgress />
				<NotificationContainer />
			</>
		)
	} else if (!user.isAuthenticated) {
		return (
			<>
				<PublicRoutes 
					handleLogin={handleLogin}
				/>
				<NotificationContainer />
			</>
		);
	} else {
		return (
			<>
				<PrivateRoutes 
					handleLogout={handleLogout}
					user={user}
					setUser={setUser}
				/>
				<NotificationContainer />
			</>
		);
	}
}

export default withRouter(App);
