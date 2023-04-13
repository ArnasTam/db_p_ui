import { useMutation } from '@tanstack/react-query';
import useMessagesService from 'src/hooks/services/use_messages_service';

const useCreateMessageMutation = () => {
  const messagesService = useMessagesService();

  return useMutation({
    mutationFn: (data: { content: string; toId: string }) =>
      messagesService.createMessage(data.content, data.toId),
  });
};

export default useCreateMessageMutation;
