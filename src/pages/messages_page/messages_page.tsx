import { useAuth0 } from '@auth0/auth0-react';
import { io } from 'socket.io-client';
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PageWrapper from 'src/components/page_layout/page_layout';
import useCreateMessageMutation from 'src/hooks/mutations/messages_mutations';
import { useGetMessagesQuery } from 'src/hooks/queries/messages_queries';
import { useGetUsersQuery } from 'src/hooks/queries/users_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const MessagesPage: FC = () => {
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { user: currentUser } = useAuth0();
  const createMessageMutation = useCreateMessageMutation();
  const [selectedUser, setSelectedUser] = useState<string | undefined>();
  const [messageContent, setMessageContent] = useState<string>('');

  const {
    data: users,
    isError: usersIsError,
    isLoading: usersIsLoading,
  } = useGetUsersQuery();

  const {
    data: messages,
    isError: messagesIsError,
    isLoading: messagesIsLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(currentUser?.sub, selectedUser);

  const scrollToBottom = useCallback(
    () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }),
    [],
  );

  useEffect(() => {
    const url = process.env.REACT_APP_API_BASE_URL;
    if (currentUser?.sub && url && !isListening) {
      const socket = io(url);
      socket.emit('join', { email: currentUser?.sub });
      socket.on('new_messages', () => {
        refetchMessages().then();
      });
      setIsListening(true);

      return () => socket.disconnect();
    }

    return () => {};
  }, [currentUser]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (createMessageMutation.isSuccess) {
      refetchMessages().then();
    }
  }, [createMessageMutation.isSuccess]);

  const handleUserChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedUser(event.target.value);
    },
    [],
  );

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessageContent(event.target.value);
    },
    [],
  );

  const handleMessageSend = useCallback(() => {
    if (!selectedUser) return;

    createMessageMutation.mutate({
      content: messageContent,
      toId: selectedUser,
    });
  }, [messageContent, selectedUser]);

  if (usersIsLoading || messagesIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (usersIsError || messagesIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper>
      <Select
        placeholder="Select User"
        onChange={handleUserChange}
        value={selectedUser}
      >
        {users?.map(user =>
          user.id !== currentUser?.sub ? (
            <option value={user.id}>{user.email}</option>
          ) : (
            <></>
          ),
        )}
      </Select>
      <Box overflowY="scroll" h="70vh" mt="10px">
        {messages?.map(message => (
          <Flex
            w="100%"
            justifyContent={
              message.from.id === currentUser?.sub ? 'flex-end' : 'flex-start'
            }
          >
            <Card
              w="45%"
              p="20px"
              m="10px"
              backgroundColor={
                message.from.id === currentUser?.sub ? 'gray.50' : 'blue.100'
              }
            >
              <Text>{message.content}</Text>
              <HStack fontSize="12px" color="gray">
                <Text>From:</Text>
                <Text>{message.from.email}</Text>
              </HStack>
            </Card>
          </Flex>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box position="fixed" w="100%" bottom="10px">
        <Center w="100%">
          <Flex w="90%">
            <Input onChange={e => handleMessageChange(e)} />
            <Button colorScheme="blue" onClick={handleMessageSend}>
              Send
            </Button>
          </Flex>
        </Center>
      </Box>
    </PageWrapper>
  );
};
export default MessagesPage;
