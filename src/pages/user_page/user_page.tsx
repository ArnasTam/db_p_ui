import {
  Button,
  Card,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RiEyeFill } from 'react-icons/ri';
import PageWrapper from 'src/components/page_layout/page_layout';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from 'src/hooks/mutations/user_follows_mutations';
import {
  useGetFollowingQuery,
  useGetUsersQuery,
} from 'src/hooks/queries/users_queries';
import { User } from 'src/models/user';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const UsersPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();
  const {
    isLoading: followingIsLoading,
    data: following,
    isError: followingIsError,
    refetch: refetchFollowing,
  } = useGetFollowingQuery();

  const handleSearch = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setSearchQuery(event.target.value);
    },
    [],
  );

  const handleUserInspect = useCallback((user: User) => {
    setSelectedUser(user);
    onOpen();
  }, []);

  const selectedUserIsFollowed = useMemo(
    () => following?.some((user: User) => user.id === selectedUser?.id),
    [selectedUser, following],
  );

  const filteredUsers = useMemo(() => {
    if (users) {
      return users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return [];
  }, [users, searchQuery]);

  useEffect(() => {
    if (followUserMutation.isSuccess || unfollowUserMutation.isSuccess) {
      refetchFollowing();
    }
  }, [followUserMutation.isSuccess, unfollowUserMutation.isSuccess]);

  if (usersLoading || followingIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (usersLoading || followingIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper>
      <Center pb="15px">
        <Heading size="sm" color="grey">
          All Users
        </Heading>
      </Center>
      <Input onChange={handleSearch} placeholder="Search by email" />
      {filteredUsers?.map(user => (
        <Card p="10px" m="10px">
          <Flex>
            <Text fontWeight="bold" color="grey" pr="10px">
              Email:
            </Text>
            <Text>{user.email}</Text>
            <Spacer />
            <Center>
              <Button onClick={() => handleUserInspect(user)}>
                <RiEyeFill />
              </Button>
            </Center>
          </Flex>
        </Card>
      ))}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Text fontWeight="bold" color="grey" pr="10px">
                ID:
              </Text>
              <Text>{selectedUser?.id}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="grey" pr="10px">
                Email:
              </Text>
              <Text>{selectedUser?.email}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="grey" pr="10px">
                About:
              </Text>
              <Text>{selectedUser?.about}</Text>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={selectedUserIsFollowed ? 'red' : 'blue'}
              mr={3}
              onClick={() => {
                if (!selectedUser) return null;

                return selectedUserIsFollowed
                  ? unfollowUserMutation.mutate(selectedUser.id)
                  : followUserMutation.mutate(selectedUser.id);
              }}
            >
              {selectedUserIsFollowed ? 'Unfollow' : 'Follow'}
            </Button>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
export default UsersPage;
