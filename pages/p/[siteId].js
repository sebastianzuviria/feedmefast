import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import Feedback from '@/components/Feedback'
import {
    Box,
    FormControl,
    FormLabel,
    Button,
    Input
  } from '@chakra-ui/react'

export async function getStaticProps(context) {
    const siteId = context.params.siteId
    const feedback = await getAllFeedback(siteId)
    
    return {
      props: {
          initialFeedback: feedback
      },
    }
}

export async function getStaticPaths() {
    const sites = await getAllSites()
    const paths = sites.map(site => ({
        params: { 
            siteId: site.id.toString()
        }
    }))

    return {
      paths,
      fallback: false
    };
}

const SiteFeedback = ({ initialFeedback }) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            width="full" 
            maxWidth="700px"
            margin="0 auto"
        >
            <Box as="form">
                <FormControl m={8}>
                    <FormLabel htmlFor='comment'>Comment</FormLabel>
                    <Input id='comment' type='comment' />
                    <Button type="submit" mt={2}>Add Comment</Button>
                </FormControl>
            </Box>
            
            {
                initialFeedback.map(feedback => (
                    <Feedback key={feedback.id} {...feedback}/>
                ))
            }
        </Box>
    )
}

export default SiteFeedback