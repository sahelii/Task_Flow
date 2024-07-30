import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';

const TasksPage = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TasksPage;
