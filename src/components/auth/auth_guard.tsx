import React, { FC, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';
import useCreateUserMutation from 'src/hooks/mutations/create_user_mutations';
import { useAuthStore } from 'src/providers/use_auth_store';
import LoadingView from 'src/views/loading_view/loading_view';

const AuthGuard: FC = () => {
  const { accessToken, setAccessToken, setCurrentUser } = useAuthStore();
  const mutation = useCreateUserMutation();
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently();
        setAccessToken(token);

        if (user?.sub && user.email) {
          mutation.mutate({ id: user.sub, email: user.email, about: '-' });
        }
      })();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (mutation.data) {
      setCurrentUser(mutation.data);
    }
  }, [mutation.data]);

  if (isAuthenticated && accessToken) return <Outlet />;
  if (!isAuthenticated && !isLoading) {
    (async () => loginWithRedirect())();
  }
  return <LoadingView />;
};

export default AuthGuard;
