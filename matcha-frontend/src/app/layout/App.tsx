import React, { Fragment, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from '../../features/nav/Navigation';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Profiles from '../../testProfiles1.json';
import Chat from '../../features/chat/Chat';
import Profile from '../../features/profile/ProfileForm';
import Footer from '../../features/nav/Footer';
import Login from '../../features/user/Login';
import Register from '../../features/user/Register';
import Landing from '../../features/home/Landing';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';
import NotFound from './NotFound';
import EmailVerification from '../../features/user/EmailVerification';
import ChangePassword from '../../features/user/ChangePassword';
import { ToastContainer } from 'react-toastify';
import ProfilePage from '../../features/profile/ProfilePage';
import ModalContainer from '../common/modals/ModalContainer';
import PrivateRoute from './PrivateRoute';
import SubModalContainer from '../common/modals/SubModalContainer';

const App = () => {
	// const [profile, setProfile] = useState(Profiles.profiles[0]);
	const [appLoaded, setAppLoaded] = useState(false);
	const rootStore = useContext(RootStoreContext);
	const { token, getUser, logoutUser, user } = rootStore.userStore;

	// const getRandomUser = () => {
	// 	let i = Math.floor(Math.random() * Profiles.profiles.length);
	// 	setProfile(Profiles.profiles[i]);
	// };

	useEffect(() => {
		if (token) {
			getUser()
				.catch(() => logoutUser())
				.finally(() => setAppLoaded(true));
		} else {
			setAppLoaded(true);
		}
	}, [getUser, token, setAppLoaded, logoutUser]);

	if (!appLoaded)
		return (
			<Dimmer active inverted>
				<Loader />
			</Dimmer>
		);

	return (
		<div
			style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
		>
			<Container className="main_container">
				<ModalContainer />
				<SubModalContainer />
				<ToastContainer style={{ marginTop: '5%' }} position="top-right" />
				<Router>
					<Navigation />
					<Switch>
						<Route path="/verify/:link" component={EmailVerification} />
						<Route path="/resetpassword/:link" component={ChangePassword} />
						<Route exact path="/" component={Landing} />
						<Route
							render={() => (
								<Fragment>
									<Switch>
										<PrivateRoute exact path="/" component={ProfilePage} />
										<PrivateRoute
											exact
											path="/profile"
											component={ProfilePage}
										/>
										<PrivateRoute exact path="/chat" component={Chat} />
										<PrivateRoute component={NotFound} />
									</Switch>
								</Fragment>
							)}
						/>
					</Switch>
				</Router>
			</Container>
			<Footer />
		</div>
	);
};

export default observer(App);
