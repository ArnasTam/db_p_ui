import React, { FC } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  RiArticleFill,
  RiUser2Fill,
  RiHome2Fill,
  RiMessage2Fill,
} from 'react-icons/ri';
import NavDrawerItem, {
  NavDrawerSubItem,
} from 'src/components/nav/nav_drawer_item/nav_drawer_item';

import './nav_drawer.scss';

const NavDrawer: FC = () => {
  const toast = useToast();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="menu-button"
        display="contents"
        ref={btnRef}
        onClick={() => {
          toast.closeAll();
          onOpen();
        }}
        color="black"
      >
        <HamburgerIcon w="7" h="7" />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody className="drawer-body">
            <NavDrawerItem title="Home" path="/" Icon={RiHome2Fill} />
            <NavDrawerItem title="Users" path="/users" Icon={RiUser2Fill} />
            <NavDrawerSubItem title="All Users" path="/users" />
            <NavDrawerSubItem title="Followers" path="/followers" />
            <NavDrawerSubItem title="Following" path="/following" />
            <NavDrawerItem
              title="Messages"
              path="/messages"
              Icon={RiMessage2Fill}
            />
            <NavDrawerItem title="Posts" path="/posts" Icon={RiArticleFill} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
