import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import MessagesService from 'src/services/messages_service';

const useMessagesService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new MessagesService(httpClient), [httpClient]);
};

export default useMessagesService;
