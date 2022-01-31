import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { Table, Tr, Th, Td } from './Table';


const SiteTable = ({sites}) => {
  sites.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        { sites.map(site => 
            <Box as="tr" key={site.url}>
                <Td fontWeight="medium">
                    {site.name}
                </Td>
                <Td>
                    {site.url}
                </Td>
                <Td>
                   <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                      <Link>View Feedback</Link>
                   </NextLink>
                </Td>
                <Td>
                    {format(parseISO(site.createdAt), 'PPpp')}
                </Td>
            </Box>
        )}
      </tbody>
    </Table>
  );
};

export default SiteTable;