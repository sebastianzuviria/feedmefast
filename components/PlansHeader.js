import React from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'

const PlansHeader = () => (
    <>
        <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="grey.700">Plans</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center" mb='4'>
            <Heading color="black">Plans availables</Heading>
        </Flex>
    </>
)

export default PlansHeader