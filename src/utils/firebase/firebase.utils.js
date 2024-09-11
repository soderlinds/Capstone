import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDk5yRPsm9pbQY_yxiooz6u4Gx-VrAfw9k",
  authDomain: "crown-db-41706.firebaseapp.com",
  projectId: "crown-db-41706",
  storageBucket: "crown-db-41706.appspot.com",
  messagingSenderId: "781771372016",
  appId: "1:781771372016:web:f90e16c800a278125b5935"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log('error creating the user', error.message);
        }
        }

        return userDocRef;
    };

    export const createAuthUserWithEmailAndPassword = async (email, password) => {
        if(!email || !password) return;

        createAuthUserWithEmailAndPassword(auth, email, password)
    }
