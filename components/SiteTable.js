import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { Table, Tr, Th, Td } from './Table';
import DeleteSiteButton from './DeleteSiteButton';

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
                    <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                      <Link fontWeight='medium'>{site.name}</Link>
                    </NextLink>
                </Td>
                <Td>
                  <Link href={site.url} isExternal>{site.url}</Link>
                </Td>
                <Td>
                   <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                      <Link color='blue.400' fontWeight='medium'>View Feedback</Link>
                   </NextLink>
                </Td>
                <Td>
                    {format(parseISO(site.createdAt), 'PPpp')}
                </Td>
                <Td>
                  <DeleteSiteButton siteId={site.id} />
                </Td>
            </Box>
        )}
      </tbody>
    </Table>
  );
};

export default SiteTable;