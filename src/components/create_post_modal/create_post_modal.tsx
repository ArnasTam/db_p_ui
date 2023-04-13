import React, { FC } from 'react';
import PostFormModal from 'src/components/post_form_modal/post_form_modal';

interface CreatePostModalProps {
  onSave: (title: string, content: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const CreatePostModal: FC<CreatePostModalProps> = ({
  onSave,
  onClose,
  isOpen,
}) => (
  <PostFormModal
    modalTitle="Create New Post"
    onSave={onSave}
    onClose={onClose}
    isOpen={isOpen}
  />
);
export default CreatePostModal;
