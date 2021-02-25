import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@material-ui/core/Link';

import { tmdbUrl } from '../../../utils/axios';
import { minHeight } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 10,
    minHeight: '150px',
  },
  buttons: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  postTitle: {
    padding: 5
  },
  createPostButtonContainer: {
    textAlign: 'right',
  },
  movieImage: {
    width: '100px',
    height: '150px'
  },
  summary: {
    fontSize: 12,
  },
  buttonBase: {
    float: 'left',
    marginRight: 20
  }
}));

const Movies = (props) => {
  const classes = useStyles();

  const movies = props.location.state.results;
  console.log(props.location.state);

  const [selectedMovie, setSelectedMovie] = useState({ id: null });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, id) => {
    setSelectedMovie({ id });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToWatchlist = () => {
    console.log('add to watchlist ', selectedMovie.id);
    setAnchorEl(null);
  }

  // next step is to create user profile with list of liked movies, etc as well as number of followers and following.
  // If viewing some elses profile, there should be an option to follow them. Users should also be able to click movies
  // and add them straight to their own list of liked movies, etc.

  const handleAddToWatched = () => {
    console.log('add to watched ', selectedMovie.id);
    setAnchorEl(null);
  }

  const handleLike = () => {
    console.log('add to liked ', selectedMovie.id);
    setAnchorEl(null);
  }

  return (
    <div>
      <Box p={5}>
        {movies.map(movie => (
          <Box key={movie.id} mt={3}>
            <Paper className={classes.paper} elevation={3}>
              <ButtonBase className={classes.buttonBase}>
                <img className={classes.movieImage} src={tmdbUrl + movie.poster_path} />
              </ButtonBase>
              <div className={classes.postTitle}>
                <Link href="#">
                  {movie.title}
                  {' '}({movie.release_date ? + movie.release_date.slice(0,4) : null})
                </Link>
                <IconButton onClick={(event) => handleClick(event, movie.id)} style={{ float: 'right' }}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleAddToWatchlist}>Add to watchlist</MenuItem>
                  <MenuItem onClick={handleAddToWatched}>Add to watched</MenuItem>
                  <MenuItem onClick={handleLike}>Like</MenuItem>
                </Menu>
              </div>
              <Box className={classes.summary} pl={6} pb={1}>
                {movie.overview}
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Movies;