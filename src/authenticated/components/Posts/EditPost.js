import { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import { editPost } from '../../../utils/apiCalls';
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

const EditPost = (props) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({ id: props.id, content: props.content, movieTagIds: props.movieTags, userTagIds: props.userTags });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputs({ id: props.id, content: props.content, movieTagIds: props.movieTags, userTagIds: props.userTags });
  }, [props]);

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event) => {
    console.log(inputs);
		setInputs({
			...inputs,
			[event.target.name]: event.target.value
		});
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    editPost(String(inputs.id), inputs.content, inputs.movieTagIds, inputs.userTagIds)
      .then(response => {
        console.log(response);
				createNotification('success', 'Successfully edited post.');
        setLoading(false);
        props.onClose(true);
      })
      .catch(error => {
        console.log(error);
				createNotification('error', 'Could not edit post.');
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
            defaultValue={props.content}
          />
          <div style={{ textAlign: 'center' }}>
            <Button className={classes.button} onClick={handleSubmit} variant="contained" color="primary">
              Edit
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

export default EditPost;