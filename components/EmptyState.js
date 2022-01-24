import React from 'react'
import {
  Heading,
  Flex,
  Text
} from '@chakra-ui/react'

import AddSiteModal from './AddSiteModal'

const EmptyState = () => (
    <Flex
        backgroundColor="whiteAlpha.900"
        width="100%"
        borderRadius={8}
        p={16}
        align="center"
        justify="center"
        flexDirection="column"
    >
        <Heading size="md" mb={2}>You haven't added any sites.</Heading>
        <Text mb={4}>Let's get started.</Text>
        <AddSiteModal>Add Your First Site</AddSiteModal>
    </Flex>
)

export default EmptyState