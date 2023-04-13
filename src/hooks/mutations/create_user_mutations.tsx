import { useMutation } from '@tanstack/react-query';
import useUsersService from 'src/hooks/services/use_users_service';
import { User } from 'src/models/user';

const useCreateUserMutation = () => {
  const usersService = useUsersService();

  return useMutation({
    mutationFn: (data: User) => usersService.createUser(data),
  });
};

export default useCreateUserMutation;
