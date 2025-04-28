import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  const fetchTodos = () => axios
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.data)

  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })


  return (
    <ul className="list-group">
      {todos?.map((todo) => ( // todos? is optional chaining cause todos could be undefined
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
