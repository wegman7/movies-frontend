import React from 'react';
import Box from '@material-ui/core/Box';
import Posts from '../Posts/index';
import Grid from '@material-ui/core/Grid';
import Trending from '../Movies/Trending';

const Home = (props) => {
	
	return (
		<>
			<Box p={5}>
				<Grid container spacing={5}>
					<Grid item sm={12} md={8}>
						<Posts user={props.user} history={props.history} />
					</Grid>
					<Grid item sm={12} md={4}>
						<Trending />
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default Home;
