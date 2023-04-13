import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { FC, useCallback } from 'react';

interface PostFromValues {
  title: string;
  content: string;
}

interface PostFormModalProps {
  modalTitle: string;
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string, id?: number) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const PostFormModal: FC<PostFormModalProps> = ({
  modalTitle,
  initialTitle,
  initialContent,
  onSave,
  onClose,
  isOpen,
}) => {
  const validateTitle = useCallback((value: string) => {
    let error;
    if (!value) {
      error = 'Title is required';
    }
    if (value.length < 5 || value.length > 20) {
      error = 'Title must be between 5 and 20 characters in length';
    }
    return error;
  }, []);

  const validateContent = useCallback((value: string) => {
    let error;
    if (!value) {
      error = 'Content is required';
    }
    if (value.length < 5 || value.length > 300) {
      error = 'Content must be between 5 and 300 characters in length';
    }
    return error;
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          title: initialTitle ?? '',
          content: initialContent ?? '',
        } as PostFromValues
      }
      onSubmit={(values, actions) => {
        onSave(values.title, values.content).then(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
      }}
    >
      {props => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Form>
                <Field name="title" validate={validateTitle}>
                  {({ field, form }: FieldProps<string, PostFromValues>) => (
                    <FormControl
                      isInvalid={!!(form.errors.title && form.touched.title)}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input {...field} placeholder="Title" />
                      <FormErrorMessage>
                        {form.errors.title ?? ''}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="content" validate={validateContent}>
                  {({ field, form }: FieldProps<string, PostFromValues>) => (
                    <FormControl
                      isInvalid={
                        !!(form.errors.content && form.touched.content)
                      }
                    >
                      <FormLabel>Content</FormLabel>
                      <Textarea {...field} placeholder="Content" />
                      <FormErrorMessage>
                        {form.errors.content ?? ''}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => props.submitForm()}
                isLoading={props.isSubmitting}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};
export default PostFormModal;
