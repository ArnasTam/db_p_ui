import {
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect } from 'react';
import PageWrapper from 'src/components/page_layout/page_layout';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from 'src/hooks/mutations/user_follows_mutations';
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
} from 'src/hooks/queries/users_queries';
import { User } from 'src/models/user';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const FollowingPage: FC = () => {
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();
  const {
    isLoading: followingIsLoading,
    data: following,
    isError: followingIsError,
    refetch: refetchFollowing,
  } = useGetFollowingQuery();
  const { isLoading: followerIsLoading, isError: followerIsError } =
    useGetFollowersQuery();

  useEffect(() => {
    if (followUserMutation.isSuccess || unfollowUserMutation.isSuccess) {
      refetchFollowing();
    }
  }, [followUserMutation.isSuccess, unfollowUserMutation.isSuccess]);

  const selectedUserIsFollowed = useCallback(
    (selectedUser: User) =>
      following?.some((user: User) => user.id === selectedUser?.id),
    [following],
  );

  if (followerIsLoading || followingIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (followerIsError || followingIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper>
      <Center>
        <Heading size="sm" color="grey">
          Followed Users
        </Heading>
      </Center>
      {following?.map(user => (
        <Card p="10px" m="10px">
          <Flex>
            <Text fontWeight="bold" color="grey" pr="10px">
              Email:
            </Text>
            <Text>{user.email}</Text>
            <Spacer />
            <Center>
              <Button
                colorScheme={selectedUserIsFollowed(user) ? 'red' : 'blue'}
                mr={3}
                onClick={() =>
                  selectedUserIsFollowed(user)
                    ? unfollowUserMutation.mutate(user.id)
                    : followUserMutation.mutate(user.id)
                }
              >
                {selectedUserIsFollowed(user) ? 'Unfollow' : 'Follow'}
              </Button>
            </Center>
          </Flex>
        </Card>
      ))}
    </PageWrapper>
  );
};
export default FollowingPage;
