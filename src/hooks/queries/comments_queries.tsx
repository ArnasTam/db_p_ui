import { useQuery } from '@tanstack/react-query';
import useCommentsService from 'src/hooks/services/use_comments_service';

enum CommentsQueryKeys {
  GET_COMMENTS = 'get-comments',
  GET_COMMENT_BY_ID = 'get-comment-by-id',
}

export const useGetCommentsQuery = (postId: number) => {
  const commentsService = useCommentsService();

  return useQuery({
    queryKey: [CommentsQueryKeys.GET_COMMENTS, postId],
    queryFn: () => commentsService.getCommentsByPostId(postId),
    refetchOnWindowFocus: false,
  });
};

export const useGetCommentByIdQuery = (id: number) => {
  const commentsService = useCommentsService();

  return useQuery({
    queryKey: [CommentsQueryKeys.GET_COMMENT_BY_ID, id],
    queryFn: () => commentsService.getCommentByid(id),
    refetchOnWindowFocus: false,
  });
};
