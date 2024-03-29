import React from 'react'
import NextLink from 'next/link'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'

const FeedbackTableHeader = ({ siteName }) => (
    <>
        <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
                <NextLink href="/feedback" passHref>
                    <BreadcrumbLink color="grey.700">Feedback</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center" mb='4'>
            <Heading color="black">All Feedback</Heading>
        </Flex>
    </>
)

export default FeedbackTableHeader