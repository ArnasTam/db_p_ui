import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import NavBar from 'src/components/nav/nav_bar/nav_bar';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => (
  <>
    <NavBar />
    <Box p="25px">{children}</Box>
  </>
);

export default PageWrapper;
