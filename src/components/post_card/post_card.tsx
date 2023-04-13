import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import EditCommentModal from 'src/components/edit_comment_modal/edit_comment_modal';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from 'src/hooks/mutations/comments_mutatations';
import { useGetCommentsQuery } from 'src/hooks/queries/comments_queries';
import Comment from 'src/models/comment';
import { User } from 'src/models/user';

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: User;
  isReadMode?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  content,
  author,
  isReadMode = true,
  onDelete,
  onEdit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentInput, setCommentInput] = useState('');
  const [selectedForEditComment, setSelectedForEditComment] = useState<
    Comment | undefined
  >();
  const commentsCreateMutation = useCreateCommentMutation();
  const commentsUpdateMutation = useUpdateCommentMutation();
  const commentsDeleteMutation = useDeleteCommentMutation();
  const {
    data: comments,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
    refetch: refetchComments,
  } = useGetCommentsQuery(id);

  return (
    <Card p="10px" m="10px" w="100%">
      <Flex fontSize="14px">
        <Box w="100%">
          <Flex>
            <HStack>
              <Text fontWeight="bold" color="grey">
                Title:
              </Text>
              <Text fontWeight="bold">{title}</Text>
            </HStack>
            <Spacer />
            <HStack>
              <Text fontSize="12px" fontWeight="bold" color="grey">
                By:
              </Text>
              <Text fontSize="12px" fontWeight="bold" color="grey">
                {author.email}
              </Text>
            </HStack>
          </Flex>
          <Divider my="10px" />
          <Text fontWeight="bold" color="grey">
            Content:
          </Text>
          <Box>
            <Text fontWeight="bold">{content}</Text>
          </Box>
        </Box>
      </Flex>
      <Accordion allowMultiple pt="20px">
        {!isReadMode && (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Options
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Center gap="10px">
                <Button onClick={() => onEdit && onEdit(id)} w="100%">
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => onDelete && onDelete(id)}
                  w="100%"
                >
                  Delete
                </Button>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        )}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Comments
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <HStack>
              <Input
                value={commentInput}
                onChange={event => setCommentInput(event.target.value)}
              />
              <Button
                colorScheme="blue"
                onClick={() =>
                  commentsCreateMutation
                    .mutateAsync({ content: commentInput, postId: id })
                    .then(() => refetchComments())
                }
              >
                Post
              </Button>
            </HStack>
            {!commentsIsLoading && !commentsIsError ? (
              comments.map(comment => (
                <Card my="10px" p="5px" pl="15px" variant="filled">
                  <Flex>
                    <Center>
                      <Text fontWeight="bold">{comment.content}</Text>
                    </Center>
                    <Spacer />
                    <Center>
                      <Flex fontSize="10px">
                        <Text fontWeight="bold" color="grey">
                          By:
                        </Text>
                        <Text fontWeight="bold" color="grey">
                          {comment.author.email}
                        </Text>
                      </Flex>
                    </Center>
                    <Popover>
                      <PopoverTrigger>
                        <Button>
                          <BsThreeDotsVertical />
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Box m="10px">
                              <Button
                                colorScheme="blue"
                                w="80%"
                                onClick={() => {
                                  setSelectedForEditComment(comment);
                                  onOpen();
                                }}
                              >
                                Edit
                              </Button>
                            </Box>
                            <Box m="10px">
                              <Button
                                colorScheme="red"
                                w="80%"
                                onClick={() =>
                                  commentsDeleteMutation
                                    .mutateAsync({
                                      id: comment.id,
                                    })
                                    .then(() => refetchComments())
                                }
                              >
                                Delete
                              </Button>
                            </Box>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Flex>
                </Card>
              ))
            ) : (
              <Center>
                <Spinner />
              </Center>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <EditCommentModal
        initialContent={selectedForEditComment?.content ?? ''}
        isOpen={isOpen}
        onClose={onClose}
        onSave={async value => {
          if (selectedForEditComment?.id) {
            await commentsUpdateMutation.mutateAsync({
              id: selectedForEditComment?.id,
              content: value,
            });
            onClose();
            refetchComments().then();
          }
        }}
      />
    </Card>
  );
};
export default PostCard;
