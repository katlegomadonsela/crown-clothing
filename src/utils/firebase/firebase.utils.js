import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_dPpsx9vZ4hCh10BhrAHR5P1e0WhqFDo",
  authDomain: "crown-clothing-f63de.firebaseapp.com",
  projectId: "crown-clothing-f63de",
  storageBucket: "crown-clothing-f63de.appspot.com",
  messagingSenderId: "67939911524",
  appId: "1:67939911524:web:2e119ee5d6d206ce929c71"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);



export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log("error in creating the user", error);
    }
  }

  return userDocRef;
}
