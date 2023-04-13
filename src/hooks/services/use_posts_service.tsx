import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import PostsService from 'src/services/posts_service';

const usePostsService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new PostsService(httpClient), [httpClient]);
};

export default usePostsService;
