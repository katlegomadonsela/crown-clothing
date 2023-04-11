import { useState } from "react";

import { 
  signInWithGooglePopup,  
  signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles';


const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      
      resetFormFields();

    } catch(error) {
      switch(error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for the email");
          break;
        case "auth/user-not-found":
          alert("There is no user associated with this email.");
          break;
        default:
          console.log(error)
      }
    }
  };


  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email or password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Email" 
          type="email" 
          required 
          name="email" 
          value={email} 
          onChange={handleChange}
        />
        
        <FormInput 
          label="Password" 
          type="password" 
          required 
          name="password" 
          value={password} 
          onChange={handleChange}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button 
            type="button" 
            buttonType={BUTTON_TYPE_CLASSES.google} 
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;