import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
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

interface EditCommentFromValues {
  content: string;
}

interface EditCommentModalProps {
  initialContent?: string;
  onSave: (content: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const EditCommentModal: FC<EditCommentModalProps> = ({
  initialContent,
  onSave,
  onClose,
  isOpen,
}) => {
  const validateContent = useCallback((value: string) => {
    let error;
    if (!value) {
      error = 'Content is required';
    }
    return error;
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          content: initialContent ?? '',
        } as EditCommentFromValues
      }
      onSubmit={(values, actions) => {
        onSave(values.content).then(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
      }}
    >
      {props => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Form>
                <Field name="content" validate={validateContent}>
                  {({
                    field,
                    form,
                  }: FieldProps<string, EditCommentFromValues>) => (
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
export default EditCommentModal;
