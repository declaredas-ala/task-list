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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';


const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then((response) => {
      dispatch(setTasks(response.data));
    });
  }, [dispatch]);

  const handleDelete = (taskId: number) => {
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`).then(() => {
      dispatch(deleteTask(taskId));
    });
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
                color="default"
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

