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


const auth = getAuth(app)

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

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
                setUser(user)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
            });
    } 

    const signout = () => {
        signOut()
            .then(() => {
                setUser(null)
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            } else {
              setUser(null)
            }
        })

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

export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth()
    return <authContext.Provider value = {auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}