import Head from 'next/head'
import Image from 'next/image'
import { useAuth } from '@/lib/auth'
import { Button, Code, Heading, Text } from '@chakra-ui/react'


export default function Home() {
  const auth = useAuth()

  return (
    <div>
      <main>
        <Heading>Feed Me Fast</Heading>
          <Text>
            Current user: <Code>{ auth.user ? auth?.user?.email : 'None'}</Code> 
          </Text>
        {
          auth?.user ? (
            <Button onClick={() => auth.signout()}>Sign Out</Button>
          ) : (
            <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
          )
        }
      </main>
    </div>
  )
}
