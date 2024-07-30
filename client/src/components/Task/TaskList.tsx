import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { useTasks } from '../../context/TaskContext';
import axios from 'axios';

const TaskList = () => {
  const { tasks, fetchTasks } = useTasks();

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;
    if (!destination) return;

    const taskId = tasks[source.index]._id;
    const newStatus = destination.droppableId;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ display: 'flex' }}
          >
            {['To-Do', 'In Progress', 'Under Review', 'Completed'].map((status, index) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      margin: '0 8px',
                      padding: '8px',
                      backgroundColor: '#f4f5f7',
                      width: '220px',
                    }}
                  >
                    <h2>{status}</h2>
                    {tasks.filter((task) => task.status === status).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              padding: '16px',
                              margin: '0 0 8px 0',
                              backgroundColor: '#fff',
                              borderRadius: '4px',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Task task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
