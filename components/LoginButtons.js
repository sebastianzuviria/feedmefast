import { useState } from 'react'
import { 
  Button, 
  Flex, 
  Icon, 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const LoginButtons = () => {
  const [error, setError] = useState()
  const auth = useAuth();

  if(auth.loading) {
    return <Spinner />
  }

  if(error?.code === 'auth/account-exists-with-different-credential') {
    return (
      <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
      onClick={() => setError()}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Sign In Error
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        You already have this email associated with another provider: {error.customData?._tokenResponse?.verifiedProvider[0]}.
        Click to try again.
      </AlertDescription>
    </Alert>
    )
  }

  return (
    <Flex direction={['column', 'row']}>
      <Button
        onClick={async () => { 
         try {
           await auth.signinWithGithub()
         } catch (error) {
            setError(error)
         }
        }}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon={
          <Icon>
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </g>
          </Icon>
        }
        mt={4}
        mr={2}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Continue with GitHub
      </Button>
      <Button
        onClick={async () => { 
          try {
            await auth.signinWithGoogle()
          } catch (error) {
             setError(error)
          }
         }}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        leftIcon={
          <Icon viewBox='0 0 24 24'>
            <svg width="100%" height="100%" viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </g>
            </svg>
          </Icon>
        }
        mt={4}
        _hover={{ bg: 'gray.100' }}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)'
        }}
      >
        Continue with Google
      </Button>
    </Flex>
  );
};

export default LoginButtons;