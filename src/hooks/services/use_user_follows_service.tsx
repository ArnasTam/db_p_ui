import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import UserFollowsService from 'src/services/user_follows_service';

const useUserFollowsService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new UserFollowsService(httpClient), [httpClient]);
};

export default useUserFollowsService;
