import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface postQuery {
    page: number;
    pageSize: number;
}

const usePosts = (query: postQuery) => {
    const fetchPosts = () => axios
        .get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _start: (query.page - 1) * query.pageSize,
                _limit: query.pageSize
            }
        })
        .then(res => res.data);

    return useQuery<Post[], Error>({
        queryKey: ['posts', query],
        queryFn: fetchPosts,
        staleTime: 1 * 60 * 1000
    });

};

export default usePosts;