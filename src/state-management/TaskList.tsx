import { useContext } from "react";
import AuthContext from "./contexts/authContext";
import TaskContext from "./contexts/tasksContext";

const TaskList = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [tasks, dispatch] = useReducer(taskReducer, []);
  const { tasks, taskDispatch } = useContext(TaskContext);
  const { user } = useContext(AuthContext)

  return (
    <>
      <p>User: {user}</p>
      <button
        onClick={() =>
          taskDispatch({ type: 'ADD', task: { id: Date.now(), title: 'Task ' + Date.now() } })
        }
        className="btn btn-primary my-3"
      >
        Add Task
      </button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="flex-grow-1">{task.title}</span>
            <button
              className="btn btn-outline-danger"
              onClick={() =>
                taskDispatch({ type: 'DELETE', taskId: task.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
