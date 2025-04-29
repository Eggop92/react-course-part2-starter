import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import axios from 'axios';
import { Todo } from './hooks/useTodos';

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo: Todo) => {
      return axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data);
    },
    onSuccess: (savedTodo, newTodo) => {
      console.log(savedTodo);
      //Invalidating the cache: this invalidate all the cached queries starting with todos
      // not working with jsonplaceholder cause it don't save our change, it's a fake api
      // queryClient.invalidateQueries({
      //   queryKey: ['todos']
      // });

      //updating the data in the cache
      queryClient.setQueryData<Todo[]>(['todos'], todos => [savedTodo, ...(todos || [])]);
    }
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form className="row mb-3" onSubmit={e => {
      e.preventDefault();
      if (ref.current && ref.current.value) {
        addTodo.mutate({
          id: 0,
          title: ref.current.value,
          completed: false,
          userId: 1
        });
      }

    }}>
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
