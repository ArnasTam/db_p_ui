import { useMutation } from '@tanstack/react-query';
import usePostsService from 'src/hooks/services/use_posts_service';

export const useCreatePostMutation = () => {
  const postService = usePostsService();

  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      postService.createPost(data.title, data.content),
  });
};

export const useUpdatePostMutation = () => {
  const postService = usePostsService();

  return useMutation({
    mutationFn: (data: { id: number; title: string; content: string }) =>
      postService.updatePost(data.id, data.title, data.content),
  });
};

export const useDeletePostMutation = () => {
  const postService = usePostsService();

  return useMutation({
    mutationFn: (data: { id: number }) => postService.deletePost(data.id),
  });
};
