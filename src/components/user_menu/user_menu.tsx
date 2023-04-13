import React, { FC } from 'react';
import { MenuButton, MenuItem, MenuList, Menu, Avatar } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { RiLogoutBoxLine } from 'react-icons/ri';

const UserMenu: FC = () => {
  const { user, logout } = useAuth0();

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar
            src={user?.picture}
            size="md"
            name={user?.name}
            border="2px solid white"
          />
        </MenuButton>
        <MenuList zIndex="1000">
          <MenuItem
            icon={<RiLogoutBoxLine size="20px" />}
            onClick={() => logout()}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
