import { useQuery } from '@tanstack/react-query';
import useUsersService from 'src/hooks/services/use_users_service';
import { useAuthStore } from 'src/providers/use_auth_store';

enum UsersQueryKeys {
  GET_USERS = 'get-users',
  GET_FOLLOWERS = 'get-followers',
  GET_FOLLOWING = 'get-following',
}

export const useGetUsersQuery = () => {
  const usersService = useUsersService();

  return useQuery({
    queryKey: [UsersQueryKeys.GET_USERS],
    queryFn: () => usersService.getUsers(),
    refetchOnWindowFocus: false,
  });
};

export const useGetFollowersQuery = () => {
  const usersService = useUsersService();
  const { currentUser } = useAuthStore();

  return useQuery({
    queryKey: [UsersQueryKeys.GET_FOLLOWERS, currentUser],
    queryFn: () =>
      currentUser ? usersService.getFollowers(currentUser.id) : null,
    refetchOnWindowFocus: false,
  });
};

export const useGetFollowingQuery = () => {
  const usersService = useUsersService();
  const { currentUser } = useAuthStore();

  return useQuery({
    queryKey: [UsersQueryKeys.GET_FOLLOWING, currentUser],
    queryFn: () =>
      currentUser ? usersService.getFollowing(currentUser.id) : null,
    refetchOnWindowFocus: false,
  });
};
