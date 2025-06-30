import { useReducer } from 'react';
import './App.css';
import TaskContext from './state-management/contexts/tasksContext';
import HomePage from './state-management/HomePage';
import NavBar from './state-management/NavBar';
import taskReducer from './state-management/reducers/TasksReducers';

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return <TaskContext.Provider value={{ tasks, dispatch }}>
    <NavBar />
    <HomePage />
  </TaskContext.Provider >

  // return <LoginStatus />;
  // return <TaskList />
  // return <Counter />
  // return <>
  //   <TodoForm />
  //   <TodoList />
  // </>;
}

export default App;
