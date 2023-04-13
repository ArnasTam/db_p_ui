import { useMutation } from '@tanstack/react-query';
import useCommentsService from 'src/hooks/services/use_comments_service';

export const useCreateCommentMutation = () => {
  const commentsService = useCommentsService();

  return useMutation({
    mutationFn: (data: { content: string; postId: number }) =>
      commentsService.createComment(data.content, data.postId),
  });
};

export const useUpdateCommentMutation = () => {
  const commentsService = useCommentsService();

  return useMutation({
    mutationFn: (data: { id: number; content: string }) =>
      commentsService.updateComment(data.id, data.content),
  });
};

export const useDeleteCommentMutation = () => {
  const commentsService = useCommentsService();

  return useMutation({
    mutationFn: (data: { id: number }) =>
      commentsService.deleteComment(data.id),
  });
};
