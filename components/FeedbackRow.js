import { useState } from 'react'
import { mutate } from 'swr'
import { Box, Code, Switch } from '@chakra-ui/react';
import { Td } from './Table';

import DeleteFeedbackButton from './DeleteFeedbackButton';
import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';


const FeedbackRow = ({ id, author, text, status}) => {
    const auth = useAuth()
    const isChecked = status === 'active'

    const toggleFeedback = async (e) => {
        await updateFeedback(id, { status: isChecked ? 'pending' : 'active'})
        mutate({ url: "/api/feedback", token: auth.user.token })
    }

    return (
        <Box as="tr" key={id}>
            <Td fontWeight="medium">
                {author}
            </Td>
            <Td>
                {text}
            </Td>
            <Td>
                <Code>{'/'}</Code>
            </Td>
            <Td>
                <Switch 
                    colorScheme='green' 
                    size='md' 
                    isChecked={isChecked} 
                    onChange={toggleFeedback}
                />
            </Td>
            <Td>
                <DeleteFeedbackButton feedbackId={id}/>
            </Td>
        </Box>
    );
};

export default FeedbackRow;