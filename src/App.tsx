// src/App.tsx
import React from 'react';
import {
  Container,
  Typography,
  CssBaseline,
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

import backgroundImage from './ala.jpg'; // Import the image file

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed', // Keep the background image fixed
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" maxWidth="md" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>
        <AddTaskForm />
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={3} className={classes.container}>
              <Typography variant="h5" gutterBottom>
                Your Tasks
              </Typography>
              <TaskList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
