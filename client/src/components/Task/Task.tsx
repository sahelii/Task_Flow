import { useState } from 'react';
import axios from 'axios';
import { useTasks } from '../../context/TaskContext';

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
  };
}

const Task = ({ task }: TaskProps) => {
  const { fetchTasks } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`,
        editedTask,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
