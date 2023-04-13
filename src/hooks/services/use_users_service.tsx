import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import UsersService from 'src/services/users_service';

const useUsersService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new UsersService(httpClient), [httpClient]);
};

export default useUsersService;
