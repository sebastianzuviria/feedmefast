import { useState } from 'react'
import {
  Heading,
  Flex,
  Text,
  Button
} from '@chakra-ui/react'

import { createCheckoutSession } from '@/lib/db'

import { useAuth } from '@/lib/auth'

const UpgradeEmptyState = () => {
    const { user } = useAuth()
    const [isCheckoutSessionLoading, setCheckoutSessionLoading] = useState(false)

    return (
        <Flex
            backgroundColor="whiteAlpha.900"
            width="100%"
            borderRadius={8}
            p={16}
            align="center"
            justify="center"
            flexDirection="column"
        >
            <Heading size="md" mb={2}>Get feedback on your site instantly</Heading>
            <Text mb={4}>Start today, then grow with us</Text>
            <Button 
                variant="solid" 
                size="md" 
                backgroundColor="#000000"
                color='#ffffff' 
                mt={4} 
                onClick={() => {
                    setCheckoutSessionLoading(true)
                    createCheckoutSession(user.uid)
                }}
                isLoading={isCheckoutSessionLoading}
            >
                Upgrade to Starter
            </Button>
        </Flex>
    )
}

export default UpgradeEmptyState