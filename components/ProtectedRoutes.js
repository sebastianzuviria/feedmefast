import { useEffect, useState } from 'react'
import { useAuth } from "@/lib/auth";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({ router, children }) => {
  const [user, setUser] = useState()
  const [isValidated, setIsValidated] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    (async () => {
      const user = await isAuthenticated()
      setUser(user)
      setIsValidated(true)
    })()
  },  [])

  let unprotectedRoutes = [
    '/',
    '/site/[...site]',
    '/embed/[...site]'
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !user && pathIsProtected && isValidated) {
    router.push('/');
  }

  return children;
};

export default ProtectedRoutes;