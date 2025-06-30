import { useReducer } from 'react';
import './App.css';
import AuthContext from './state-management/contexts/authContext';
import TaskContext from './state-management/contexts/tasksContext';
import HomePage from './state-management/HomePage';
import NavBar from './state-management/NavBar';
import authReducer from './state-management/reducers/authReducers';
import taskReducer from './state-management/reducers/TasksReducers';

function App() {
  const [tasks, taskDispatch] = useReducer(taskReducer, []);
  const [user, authDispatch] = useReducer(authReducer, '');

  return (
    < AuthContext.Provider value={{ user, authDispatch }}>
      <TaskContext.Provider value={{ tasks, taskDispatch }}>
        <NavBar />
        <HomePage />
      </TaskContext.Provider >
    </AuthContext.Provider >
  )

  // return <LoginStatus />;
  // return <TaskList />
  // return <Counter />
  // return <>
  //   <TodoForm />
  //   <TodoList />
  // </>;
}

export default App;
