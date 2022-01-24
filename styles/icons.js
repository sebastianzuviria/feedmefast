import { createIcon } from '@chakra-ui/react'

export const Logo = createIcon({
  displayName: 'Logo',
  viewBox: '0 0 24 24',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path 
        d="M21.5269 7.494c.1566-.1567.1926-.3986.0796-.5891C19.8643 3.9684 16.662 2 13 2 7.4771 2 3 6.4771 3 12c0 5.5228 4.4771 10 10 10 2.576 0 4.9246-.9741 6.6974-2.5739.2052-.1852.2046-.5032.0092-.6987l-4.353-4.353a.5.5 0 0 1 0-.7071l6.1733-6.1734ZM14 9c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1Z" 
        fill="currentColor"
    />  ),
})
