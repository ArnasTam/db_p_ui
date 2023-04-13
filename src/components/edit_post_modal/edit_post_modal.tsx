import React, { FC } from 'react';
import PostFormModal from 'src/components/post_form_modal/post_form_modal';

interface EditPostModalProps {
  id: number;
  initialTitle: string;
  initialContent: string;
  onSave: (id: number, title: string, content: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const EditPostModal: FC<EditPostModalProps> = ({
  id,
  initialTitle,
  initialContent,
  onSave,
  onClose,
  isOpen,
}) => (
  <PostFormModal
    initialTitle={initialTitle}
    initialContent={initialContent}
    modalTitle="Edit Post"
    onSave={(title, content) => onSave(id, title, content)}
    onClose={onClose}
    isOpen={isOpen}
  />
);
export default EditPostModal;
