import React from 'react'
import NextLink from 'next/link'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'

const SiteFeedbackTableHeader = ({ siteName }) => (
    <>
        <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
                <NextLink href="/feedback" passHref>
                    <BreadcrumbLink color="grey.700">Feedback</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="grey.700">{siteName || '-'}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center" mb='4'>
            <Heading color="black">{siteName || '-'}</Heading>
        </Flex>
    </>
)

export default SiteFeedbackTableHeader