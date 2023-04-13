import { useAuth0 } from '@auth0/auth0-react';
import { Button, Center, useDisclosure } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import CreatePostModal from 'src/components/create_post_modal/create_post_modal';
import EditPostModal from 'src/components/edit_post_modal/edit_post_modal';
import PageWrapper from 'src/components/page_layout/page_layout';
import PostCard from 'src/components/post_card/post_card';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from 'src/hooks/mutations/posts_mutations';
import { useGetPostQuery } from 'src/hooks/queries/posts_queries';
import ErrorView from 'src/views/error_view/error_view';
import LoadingView from 'src/views/loading_view/loading_view';

const PostsPage: FC = () => {
  const { user: currentUser } = useAuth0();
  const createPostMutation = useCreatePostMutation();
  const deletePostMutation = useDeletePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const [editPost, setEditPost] = useState<
    { id: number; title: string; content: string } | undefined
  >();

  const {
    data: posts,
    isLoading: postsIsLoading,
    isError: postsIsError,
    refetch: refetchPosts,
  } = useGetPostQuery();

  const {
    isOpen: isCreateModalOpen,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onClose: onCloseEditModal,
    onOpen: onOpenEditModal,
  } = useDisclosure();

  if (postsIsLoading) {
    return <LoadingView showNavBar />;
  }

  if (postsIsError) {
    return <ErrorView />;
  }

  return (
    <PageWrapper>
      <Center pb="15px">
        <Button w="100%" colorScheme="blue" onClick={onOpenCreateModal}>
          Add New Post
        </Button>
      </Center>
      {posts?.map(post => (
        <Center>
          <PostCard
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            isReadMode={currentUser?.sub !== post.author.id}
            onDelete={id =>
              deletePostMutation
                .mutateAsync({ id })
                .then(() => refetchPosts().then())
            }
            onEdit={id => {
              setEditPost({ id, title: post.title, content: post.content });
              onOpenEditModal();
            }}
          />
        </Center>
      ))}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={onCloseCreateModal}
        onSave={async (title: string, content: string) => {
          await createPostMutation.mutateAsync({
            title,
            content,
          });
          onCloseCreateModal();
          refetchPosts().then();
        }}
      />
      {editPost?.id && editPost?.title && editPost?.content ? (
        <EditPostModal
          id={editPost.id}
          initialTitle={editPost.title}
          initialContent={editPost.content}
          isOpen={isEditModalOpen}
          onClose={onCloseEditModal}
          onSave={async (id: number, title: string, content: string) => {
            await updatePostMutation.mutateAsync({
              id,
              title,
              content,
            });
            onCloseEditModal();
            refetchPosts().then();
          }}
        />
      ) : (
        <></>
      )}
    </PageWrapper>
  );
};
export default PostsPage;
