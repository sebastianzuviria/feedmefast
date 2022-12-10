import {
    useState,
    useEffect,
    useContext,
    createContext
} from 'react'
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider
} from "firebase/auth";
import Router from 'next/router';
import cookie from 'js-cookie'
import { app } from './firebase'
import { createUser } from './db';


const auth = getAuth(app)

const getStripeRole = async () => {
    const currentUser = auth.currentUser
    const decodedToken = await currentUser.getIdTokenResult(true)
    const stripeRole =  await decodedToken.claims.stripeRole

    return stripeRole
}

const formatUser = async (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        provider: rawUser.providerData[0].providerId,
        photoUrl: rawUser.photoURL,
        token: rawUser.accessToken,
        stripeRole: await getStripeRole()
    }
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser)
            const { token, ...userWithoutToken } = user

            createUser(user.uid, userWithoutToken)
            setUser(user)

            cookie.set('feedme-fast-auth', true, {
                expires: 1
            })

            setLoading(false);
            return user
          } else {
            setUser(null)
            setLoading(false);
            return false
          }
    }

    const signin = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                return userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            }).finally(() => {
                setLoading(false)
            });
    }

    const signinWithGithub = async () => {
        setLoading(true);
        return new Promise(async (resolve, reject) => {
            const provider = new GithubAuthProvider(); 
            try {
                const userCredential = await signInWithPopup(auth, provider)
                const user = userCredential.user;
                handleUser(user)
                Router.push('/sites')
                resolve(true)
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
                reject(error)
            } finally {
                setLoading(false);
            }
        })  
    } 

    const signinWithGoogle = async () => {  
        setLoading(true);
        return new Promise(async (resolve, reject) => {
            const provider = new GoogleAuthProvider(); 
            try {
                const userCredential = await signInWithPopup(auth, provider)
                const user = userCredential.user;
                handleUser(user)
                Router.push('/sites')
                resolve(true)
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
                reject(error)
            } finally {
                setLoading(false);
            }
        })  
    } 

    const signout = () => {
        signOut(auth)
            .then(() => {
                handleUser(false)
                cookie.remove('feedme-fast-auth')
                Router.push('/')
            })
    }

    const isAuthenticated = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUser)

        return () => unsubscribe()
    }, [])

    return {
        user,
        loading,
        isAuthenticated,
        signinWithGithub,
        signinWithGoogle,
        signin,
        signout
    }
}

const authContext = createContext()

export const AuthProvider = ({children}) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}