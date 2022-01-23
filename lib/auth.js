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
    GithubAuthProvider
} from "firebase/auth";
import { app } from './firebase'
import { createUser } from './db';


const auth = getAuth(app)

const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        provider: rawUser.providerData[0].providerId,
        photoUrl: rawUser.photoURL
    }
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)

            createUser(user.uid, user)
            setUser(user)
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
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUser)

        return () => unsubscribe()
    }, [])

    return {
        user,
        signinWithGithub,
        signin,
        signout
    }
}

const authContext = createContext()

export const AuthProvider = ({children}) => {
    const auth = useProvideAuth()
    return <authContext.Provider value = {auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}