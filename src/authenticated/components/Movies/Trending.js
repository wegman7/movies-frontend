import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import { tmdbUrl } from '../../../utils/axios';
import { getTrending } from '../../../utils/apiCalls';

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
  postTitleContainer: {
    // paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    // backgroundColor: 'green',
  },
  postTitle: {
    flexGrow: 1,
    paddingTop: 10
  },
  createPostButtonContainer: {
    textAlign: 'right',
  },
  movieImage: {
    width: '100px',
    height: '150px',
    paddingBottom: 5
  },
  summary: {
    fontSize: 12,
  },
  buttonBase: {
    float: 'left',
    marginRight: 20
  },
  iconButton: {
    width: 25,
    height: 25,
    marginLeft: 10,
    padding: 20,
    // backgroundColor: 'red',
  }
}));

const Trending = () => {
  const classes = useStyles();

  const [selectedMovie, setSelectedMovie] = useState({ id: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMovies = () => {
    getTrending()
      .then(response => {
        console.log(response);
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadMovies();
  }, []);

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

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <div>
      {movies.map(movie => (
        <Box key={movie.id} mt={3}>
          <Paper className={classes.paper} elevation={3}>
            <ButtonBase className={classes.buttonBase}>
              <img className={classes.movieImage} src={tmdbUrl + movie.poster_path} />
            </ButtonBase>
            <div className={classes.postTitleContainer}>
              <Link className={classes.postTitle} href="#">
                {movie.title}
                {' '}({movie.release_date ? + movie.release_date.slice(0,4) : null})
              </Link>

              <IconButton className={classes.iconButton} onClick={(event) => handleClick(event, movie.id)} size="small">
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
            <Box className={classes.summary} pl={1} pb={1}>
              {movie.overview}
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  );
}

export default Trending;