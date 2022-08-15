import React from 'react'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

const SiteTableHeader = () => (
    <>
        <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="grey.700">Sites</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center" mb='4'>
            <Heading color="black">My Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
        </Flex>
    </>
)

export default SiteTableHeader