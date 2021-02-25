import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { getPosts, deletePost } from '../../../utils/apiCalls';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import createNotification from '../../../utils/alerts';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 10
  },
  buttons: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  postTitle: {
    fontSize: 12
  },
  createPostButtonContainer: {
    textAlign: 'right',
  }
}));

const Posts = (props) => {

  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [editPostOpen, setEditPostOpen] = useState(false);
  const [editPostDetails, setEditPostDetails] = useState({ id: null, content: '', movieTagIds: [], userTagIds: [] });

  const loadPosts = () => {
    setLoading(true);
    getPosts()
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
    });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const handleClick = (event, id, content, movieTags, userTags) => {
    setEditPostDetails({ id, content, movieTags, userTags });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleEditPostOpen();
    setAnchorEl(null);
  }

  const handleDelete = () => {
    setLoading(true);
    deletePost(String(editPostDetails.id))
      .then(result => {
        console.log(result);
        createNotification('success', 'Successfully edited post.');
        loadPosts();
      })
      .catch(error => {
        console.log(error);
				createNotification('error', 'Could not delete post.');
        setLoading(false);
      });
    setAnchorEl(null);
  }

  const handleCreatePostClose = (reloadPosts) => {
    setCreatePostOpen(false);
    if (reloadPosts) {
      loadPosts();
    }
  };

  const handleCreatePostOpen = () => {
    setCreatePostOpen(true);
  };

  const handleEditPostClose = (reloadPosts) => {
    setEditPostOpen(false);
    if (reloadPosts) {
      loadPosts();
    }
  };

  const handleEditPostOpen = () => {
    setEditPostOpen(true);
  };

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <>
      <Box className={classes.createPostButtonContainer} mt={3}>
        <Button className={classes.createPostButton} onClick={handleCreatePostOpen} variant="contained" color="primary">New post</Button>
      </Box>
      {posts.map(post => (
        <Box key={post.id} mt={3}>
          <Paper className={classes.paper} elevation={3}>
            <Grid container>
              <Grid item xs={11}>
               <IconButton>
                 <AccountCircleIcon />
                </IconButton>
                <span className={classes.postTitle}>
                  {post.user.username}
                </span>
                <br />
               <Box pl={6} pb={1}>
                {post.content}
               </Box>
              </Grid>
              <Grid item xs={1}>
              {post.user.id === props.user.id
              ? 
                <div>
                  <IconButton onClick={(event) => handleClick(event, post.id, post.content, post.movieTags, post.userTags)} style={{ float: 'right' }}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </div>
              : null}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
      <CreatePost open={createPostOpen} onClose={handleCreatePostClose} loadPosts={loadPosts} />
      <EditPost 
        open={editPostOpen} 
        onClose={handleEditPostClose} 
        loadPosts={loadPosts} 
        id={editPostDetails.id}
        content={editPostDetails.content}
        movieTags={editPostDetails.movieTags}
        userTags={editPostDetails.userTags}
      />
    </>
  );
}

export default Posts;