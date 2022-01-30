import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { 
    Box,
    FormControl,
    FormLabel,
    Input, 
    Button
} from "@chakra-ui/react";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { Timestamp } from "firebase/firestore";
import { createFeedback } from "@/lib/db";

export async function getStaticProps(context) {
    const siteId = context.params.siteId
    const { feedback } = await getAllFeedback(siteId)

    return {
        props: {
            initialFeedback: feedback
        },
    }
}

export async function getStaticPaths() {
    const { sites } = await getAllSites()
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
    const auth = useAuth()
    const router = useRouter()
    const inputEl = useRef(null)
    const [allFeedback, setAllFeedback] = useState(initialFeedback)

    const onSubmit = async (e) => {
        e.preventDefault()

        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputEl.current.value,
            createdAt: Timestamp.fromDate(new Date()),
            provider: auth.user.provider,
            status: 'pending'
        }

        setAllFeedback([{...newFeedback, createdAt: newFeedback.createdAt.toDate().toISOString()}, ...allFeedback])

        await createFeedback(newFeedback)
    }

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            width="full" 
            maxWidth="700px" 
            margin="0 auto"
        >
        <Box as="form" onSubmit={onSubmit}>
            <FormControl my={8}>
                <FormLabel htmlFor='comment'>Comment</FormLabel>
                <Input ref={inputEl} id='cooment' type='comment' />
                <Button 
                    mt={2}
                    fontWeight="medium"
                    type="submit"
                >
                    Add Comment
                </Button>
            </FormControl>
        </Box>
        {
            allFeedback.map(feedback => {
                return <Feedback key={feedback.id} {...feedback} />
            })
        }
        </Box>
    ) 
}

export default SiteFeedback