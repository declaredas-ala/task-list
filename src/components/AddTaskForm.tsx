import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasksSlice';
import { TextField, Button, Grid } from '@mui/material';

import axios from 'axios';

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (title.trim() !== '') {
      axios.post('http://localhost:5000/api/tasks', { title }).then((response) => {
        dispatch(addTask(response.data));
        setTitle('');
      });
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTaskForm;
