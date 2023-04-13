import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CommentsService from 'src/services/comments_service';

const useCommentsService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CommentsService(httpClient), [httpClient]);
};

export default useCommentsService;
