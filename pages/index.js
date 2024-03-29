import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Flex, Text, Box } from '@chakra-ui/react'
import { Logo } from '@/styles/icons'

import { getAllFeedback, getSite } from '@/lib/db-admin'
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import LoginButtons from '@/components/LoginButtons'
import Footer from '@/components/Footer'
import NextLink from 'next/link'

const SITE_ID = 'UOZSkrYiTSJQMJQktaNA'//process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: JSON.parse(JSON.stringify(feedback)),
      site: JSON.stringify(site)
    },
    revalidate: 1
  };
}

const Home = ({ allFeedback, site }) => {
  const auth = useAuth()

  return (
    <>
    <Box bg="gray.100" py={16} px={4}>
      <Flex as="main" direction="column" maxW="700px" margin="0 auto">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                  window.location.href = "/sites"
                }
              `
            }}
          />
        </Head>
        <Logo  w={14} h={14} color="black"/>
        <Text mb={4} fontSize="lg" py={4}>
          <Text as="span" fontWeight="bold" display="inline">
            FeedMeFast
          </Text>
          {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
        </Text>
        {
            auth.user ? (
              <NextLink
                href="/sites"
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                mt={4}
                maxW="200px"
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)'
                }}
              >
                View Dashboard
              </NextLink>
            ) : (
              <LoginButtons />
          )
        }
      </Flex>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
      mt={8}
      px={4}
    >
      <FeedbackLink paths={[SITE_ID]} />
      {allFeedback.map((feedback, index) => (
        <Feedback
          key={feedback.id}
          isLast={index === allFeedback.length - 1}
          {...feedback}
        />
      ))}
    </Box>
    <Footer />
  </>
  )
}

export default Home
