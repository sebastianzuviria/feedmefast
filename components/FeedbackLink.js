import { Flex, Link } from '@chakra-ui/react';

export default function FeedbackLink({ siteId }) {
  return (
    <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
      <Link
        fontWeight="bold"
        fontSize="sm"
        href={`/site/${siteId}`}
        target="_parent"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by FeedMeFast
      </Link>
    </Flex>
  );
}