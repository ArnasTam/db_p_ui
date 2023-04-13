import { useQuery } from '@tanstack/react-query';
import usePostsService from 'src/hooks/services/use_posts_service';

enum PostsQueryKeys {
  GET_POSTS = 'get-posts',
  GET_POST_BY_ID = 'get-post-by-id',
}

export const useGetPostQuery = () => {
  const postsService = usePostsService();

  return useQuery({
    queryKey: [PostsQueryKeys.GET_POSTS],
    queryFn: () => postsService.getPosts(),
    refetchOnWindowFocus: false,
  });
};

export const useGetPostByIdQuery = (id: number) => {
  const postsService = usePostsService();

  return useQuery({
    queryKey: [PostsQueryKeys.GET_POST_BY_ID, id],
    queryFn: () => postsService.getPostById(id),
    refetchOnWindowFocus: false,
  });
};
