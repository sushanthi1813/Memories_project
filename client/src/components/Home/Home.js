import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from "../pagination"; // assuming this is the correct import for pagination
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles from Material-UI

const useStyles = makeStyles((theme) => ({
  pagination: {
    ul: {
      justifyContent: 'space-around',
    },
    // Define your styles here
  },
}));

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles(); // Initialize the classes from useStyles

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* <Paper className={classes.pagination} elevation={6}> Fixed 'elevatiob' typo */}
              {/* <Pagination /> Assuming Pagination is a component */}
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
