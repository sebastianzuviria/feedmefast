import React from 'react'
import {
  Heading,
  Box,
  Text,
  Button
} from '@chakra-ui/react'
import DashboardShell from './DashboardShell'

const FreePlanEmptyState = () => (
    <DashboardShell>
        <Box
            backgroundColor="whiteAlpha.900"
            width="100%"
            borderRadius={8}
            p={12}
        >
            <Heading size="md">Feed you with comments of people instantly.</Heading>
            <Text>Start today, then grow with us</Text>
            <Button variant="solid" size="md">Upgrade to Starter</Button>
        </Box>
    </DashboardShell>
)

export default FreePlanEmptyState