import { useState, useRef } from 'react'
import useSWR, { mutate } from 'swr'
import { Timestamp } from 'firebase/firestore'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Button,
    useToast
} from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import { createSite } from '@/lib/db'
import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'


const AddSiteModal = ({children}) => {
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, reset } = useForm()
    const toast = useToast()
    const auth = useAuth()
    const { data } = useSWR('/api/sites', fetcher)

    const onCreateSite = async ({name, url}) => {
      const newSite = {
        authorId: auth.user.uid,
        createdAt: Timestamp.fromDate(new Date()),
        name, 
        url
      }

      try {
        setLoading(true)
        await createSite(newSite)
        toast({
          title: 'Success!',
          description: "We've added your site.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        mutate('/api/sites', async (cache) => {
          return { sites: [...cache.sites, {...newSite, createdAt: new Date().toISOString()}] 
        }}, false)
        setLoading(false)
        reset()
        onClose()
      } catch (error) {
        toast({
          title: 'Error!',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    const initialRef = useRef()
  
    return (
      <>
        <Button 
          onClick={onOpen} 
          variant="solid" 
          size="md" 
          maxW="200px" 
          fontWeight="medium"
          backgroundColor="gray.900"
          color="white"
          _hover={{ bg: 'gray.700' }}
          _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}  
        >{children}</Button>

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
            <ModalHeader fontWeight="bold">Add Site</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                    ref={initialRef} 
                    placeholder='My site' 
                    {...register("name", { required: true })}
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input 
                    placeholder='https://website.com' 
                    {...register("url", { required: true })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3} fontWeight="medium">Cancel</Button>
              <Button 
                backgroundColor="#99FFFE"
                color="#194D4C"
                fontWeight="medium"
                type="submit"
                disabled={loading}
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

 
      </>
    )
}

export default AddSiteModal