import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODO } from "../constants";

interface AddTodoContext {
    previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: (todo: Todo) => {
            return axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
                .then(res => res.data);
        },
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODO) || [];
            console.log(newTodo);
            //Invalidating the cache: this invalidate all the cached queries starting with todos
            // not working with jsonplaceholder cause it don't save our change, it's a fake api
            // queryClient.invalidateQueries({
            //   queryKey: [CACHE_KEY_TODO]
            // });
            //updating the data in the cache
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos = []) => [newTodo, ...todos]);

            onAdd();
            return { previousTodos }
        },
        onSuccess: (savedTodo, newTodo) => {
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, todos => todos?.map(todo => todo === newTodo ? savedTodo : todo))
        },
        onError: (error, newTodo, context) => {
            if (!context) return;

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, context.previousTodos);
        }
    });
}

export default useAddTodo;