import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const {user} = response;
    
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h2>Sign in Page</h2>
      <button onClick={logGoogleUser}>
        Sign In With Google
      </button>
    </div>
  )
}

export default SignIn;