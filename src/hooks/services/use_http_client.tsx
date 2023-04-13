import { useMemo } from 'react';
import { useAuthStore } from 'src/providers/use_auth_store';
import HttpClient from 'src/services/http_client';

const useHttpClient = () => {
  const { accessToken } = useAuthStore();
  return useMemo(
    () => new HttpClient(process.env.REACT_APP_API_BASE_URL ?? '', accessToken),
    [accessToken],
  );
};

export default useHttpClient;
