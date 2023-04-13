import { useQuery } from '@tanstack/react-query';
import useMessagesService from 'src/hooks/services/use_messages_service';
import useUsersService from 'src/hooks/services/use_users_service';
import { useAuthStore } from 'src/providers/use_auth_store';

enum MessagesQueryKeys {
  GET_MESSAGES = 'get-messages',
}

export const useGetMessagesQuery = (fromId?: string, toId?: string) => {
  const messagesService = useMessagesService();

  return useQuery({
    queryKey: [MessagesQueryKeys.GET_MESSAGES, fromId, toId],
    queryFn: () =>
      fromId && toId ? messagesService.getMessages(fromId, toId) : [],
    refetchOnWindowFocus: false,
  });
};

export const testa = () => {
  const usersService = useUsersService();
  const { currentUser } = useAuthStore();

  return useQuery({
    queryKey: [MessagesQueryKeys.GET_MESSAGES, currentUser],
    queryFn: () =>
      currentUser ? usersService.getFollowing(currentUser.id) : null,
    refetchOnWindowFocus: false,
  });
};
