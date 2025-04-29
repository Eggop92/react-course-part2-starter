import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import axios from 'axios';
import { Todo } from './hooks/useTodos';

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => {
      return axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data);
    },
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
      console.log(newTodo);
      //Invalidating the cache: this invalidate all the cached queries starting with todos
      // not working with jsonplaceholder cause it don't save our change, it's a fake api
      // queryClient.invalidateQueries({
      //   queryKey: ['todos']
      // });
      //updating the data in the cache
      queryClient.setQueryData<Todo[]>(['todos'], todos => [newTodo, ...(todos || [])]);
      if (ref.current) ref.current.value = '';
      return { previousTodos }
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], todos => todos?.map(todo => todo === newTodo ? savedTodo : todo))
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
    }
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && <div className="alert alert-danger">{addTodo.error.message}</div>}
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
          <button className="btn btn-primary" disabled={addTodo.isLoading}>{addTodo.isLoading ? 'Adding...' : 'Add'}</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
