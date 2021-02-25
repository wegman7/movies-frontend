import { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createPost } from '../../../utils/apiCalls';
import createNotification from '../../../utils/alerts';

const useStyles = makeStyles((theme) => ({
  text: {
    width: '400px',
  },
  button: {
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  }
}));

const CreatePost = (props) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({ content: '', movieTagIds: [], userTagIds: [] });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value
		});
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    createPost(inputs.content, inputs.movieTagIds, inputs.userTagIds)
      .then(response => {
        console.log(response);
				createNotification('success', 'Successfully created post.');
        setLoading(false);
        props.onClose(true);
      })
      .catch(error => {
        console.log(error);
				createNotification('error', 'Could not create post.');
        setLoading(false);
      });
  }
  
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <Box p={1}>
        <form onChange={handleChange}>
          <TextField
            className={classes.text}
            label="Content"
            multiline
            rows={4}
            variant="filled"
            name="content"
          />
          <div style={{ textAlign: 'center' }}>
            <Button className={classes.button} onClick={handleSubmit} variant="contained" color="primary">
              Post
            </Button>
            <Button className={classes.button} onClick={() => props.onClose(false)} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Dialog>
  );
}

export default CreatePost;