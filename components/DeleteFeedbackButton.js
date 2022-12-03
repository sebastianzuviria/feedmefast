import React, { useRef } from 'react'
import { mutate } from 'swr'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button, 
    IconButton
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteFeedback } from '@/lib/db'
import { useAuth } from '@/lib/auth'

const DeleteFeedbackButton = ({ feedbackId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const auth = useAuth()

  const onDelete = async () => {
      await deleteFeedback(feedbackId)
      mutate(
          { url: "/api/feedback", token: auth.user.token }, 
          async (data) => {
              return { feedback: data.feedback.filter(
                  feedback => feedback.id !== feedbackId 
              ) 
          }}, 
          false
      )
      onClose()
  }

  return (
    <>
      <IconButton aria-label='Delete feedback' icon={<DeleteIcon />} variant='ghost' onClick={onOpen}/>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Feedback
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteFeedbackButton