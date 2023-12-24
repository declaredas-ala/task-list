// src/App.tsx
import React from 'react';
import {
  Container,
  Typography,
  CssBaseline,
  Grid,
  Paper,
} from '@mui/material';
import { styled, Theme } from '@mui/system';

import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

import backgroundImage from './ala.jpg';

const RootContainer = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const MainContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
}));

const App: React.FC = () => {
  return (
    <RootContainer>
      <CssBaseline />
      <MainContainer maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>
        <AddTaskForm />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>
                Your Tasks
              </Typography>
              <TaskList />
            </Paper>
          </Grid>
        </Grid>
      </MainContainer>
    </RootContainer>
  );
};

export default App;
