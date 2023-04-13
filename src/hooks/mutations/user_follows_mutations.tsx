import { useMutation } from '@tanstack/react-query';
import useUserFollowsService from 'src/hooks/services/use_user_follows_service';

export const useFollowUserMutation = () => {
  const followsService = useUserFollowsService();

  return useMutation({
    mutationFn: (id: string) => followsService.follow(id),
  });
};

export const useUnfollowUserMutation = () => {
  const followsService = useUserFollowsService();

  return useMutation({
    mutationFn: (id: string) => followsService.unfollow(id),
  });
};
