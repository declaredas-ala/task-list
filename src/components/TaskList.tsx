import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, deleteTask, updateTask } from '../features/tasksSlice';
import { RootState } from '../store';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  const handleUpdate = async (id: number, value: string) => {
    const updatedTask = { id, title: value };

    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      dispatch(updateTask(updatedTask));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>('');

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <TextField
                value={editedTaskTitle}
                onChange={(e) => setEditedTaskTitle(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(task.id, editedTaskTitle)}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingTaskId(null);
                  setEditedTaskTitle('');
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <ListItemText primary={task.title} />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingTaskId(task.id);
                  setEditedTaskTitle(task.title);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
