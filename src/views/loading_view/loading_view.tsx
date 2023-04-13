import React, { FC } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import PageWrapper from 'src/components/page_layout/page_layout';

interface LoadingViewProps {
  showNavBar?: boolean;
}

const LoadingView: FC<LoadingViewProps> = ({ showNavBar = false }) =>
  showNavBar ? (
    <PageWrapper>
      <Center h="80vh" color="green">
        <Spinner size="xl" />
      </Center>
    </PageWrapper>
  ) : (
    <Center h="100vh" color="green">
      <Spinner size="xl" />
    </Center>
  );

export default LoadingView;
