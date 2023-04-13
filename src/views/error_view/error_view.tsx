import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { RiErrorWarningLine } from 'react-icons/ri';
import PageWrapper from 'src/components/page_layout/page_layout';

const ErrorView: FC = () => (
  <PageWrapper>
    <Center h="80vh">
      <Box>
        <Center>
          <RiErrorWarningLine fontSize="130px" color="grey" />
        </Center>
        <Text fontSize="30px" textAlign="center" color="grey">
          There was a problem loading this page.
        </Text>
      </Box>
    </Center>
  </PageWrapper>
);

export default ErrorView;
