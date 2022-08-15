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
import cookie from 'js-cookie'
import { app } from './firebase'
import { createUser } from './db';


const auth = getAuth(app)

const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        provider: rawUser.providerData[0].providerId,
        photoUrl: rawUser.photoURL,
        token: rawUser.accessToken
    }
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)
            const { token, ...userWithoutToken } = user

            createUser(user.uid, userWithoutToken)
            setUser(user)

            cookie.set('feedme-fast-auth', true, {
                expires: 1
            })

            return user
          } else {
            setUser(null)
            return false
          }
    }

    const signin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                return userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const signinWithGithub = () => {
        const provider = new GithubAuthProvider(); 

        signInWithPopup(auth, provider)
            .then((userCredential) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                //   const credential = GithubAuthProvider.credentialFromResult(userCredential);
                //   const token = credential.accessToken;
                const user = userCredential.user;
                handleUser(user)
                window.location.href = '/dashboard'
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
            });
    } 

    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider(); 

        signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user;
                handleUser(user)
                window.location.href = '/dashboard'
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
            });
    } 

    const signout = () => {
        signOut(auth)
            .then(() => {
                handleUser(false)
                cookie.remove('feedme-fast-auth')
                window.location.href = '/'
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUser)

        return () => unsubscribe()
    }, [])

    return {
        user,
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