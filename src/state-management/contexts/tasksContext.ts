import { createContext, Dispatch } from "react";
import { Task, TaskAction } from "../reducers/TasksReducers";


interface TaskContextType {
    tasks: Task[];
    taskDispatch: Dispatch<TaskAction>
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export default TaskContext;