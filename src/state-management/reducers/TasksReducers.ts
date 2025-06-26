

interface Task {
    id: number;
    title: string;
}

interface AddTask {
    type: 'ADD';
    task: Task;
}
interface DeleteTask {
    type: 'DELETE';
    taskId: number;
}

type Action = AddTask | DeleteTask;

const taskReducer = (tasks: Task[], action: Action): Task[] => {
    switch (action.type) {
        case 'ADD':
            return [action.task, ...tasks];
        case 'DELETE':
            return tasks.filter(task => task.id !== action.taskId);
    }
}

export default taskReducer;