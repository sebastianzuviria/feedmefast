import React from 'react'
import NextLink from 'next/link'
import {
  Flex,
  Stack,
  Avatar,
  Box
} from '@chakra-ui/react'
import { Logo } from '@/styles/icons'
import { useAuth } from '@/lib/auth'


const DashboardShell = ({children}) => {
    const auth = useAuth()

    return (
        <>
            <Flex flexDirection="column">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor="whiteAlpha.900"
                    py={2}
                    px={8}
                >
                    <Stack spacing={4} isInline justifyContent="center" alignItems="center">
                    <Logo  w={9} h={9} color="black" mr={8} onClick={() => window.location.href = '/'}  _hover={{ cursor: 'pointer' }}/>
                    { auth?.user && <NextLink href='/sites'>Sites</NextLink> }
                    { auth?.user && <NextLink href='/feedback'>Feedback</NextLink> }
                    </Stack>
                    <Flex justifyContent="center" alignItems="center">
                    {
                        auth?.user &&
                        <Box mr={6}>
                            <NextLink href='/account'>Account</NextLink>
                        </Box>
                    }
                    <Avatar size="sm" src={auth?.user?.photoUrl}/>
                    </Flex>
                </Flex>
                <Flex
                    backgroundColor="gray.100"
                    p={10}
                    height="100vh"
                    width="100%"
                >
                    <Flex maxWidth="800px" ml="auto" mr="auto" w="100%" flexDirection="column">
                        {children}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default DashboardShell