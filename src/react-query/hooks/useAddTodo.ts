import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODO } from "../constants";
import todoService, { Todo } from "../services/todoService";


interface AddTodoContext {
    previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: todoService.post,
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