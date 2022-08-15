import React from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'

const FeedbackTableHeader = () => (
    <>
        <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="grey.700">Feedback</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center" mb='4'>
            <Heading color="black">My Feedback</Heading>
        </Flex>
    </>
)

export default FeedbackTableHeader