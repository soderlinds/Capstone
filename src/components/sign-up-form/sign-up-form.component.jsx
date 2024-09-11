import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import  FormInput  from '../form-input/form-input.component'
import Button from '../button/button.component';
import './sign-up-form.styles.scss'
const defaultFormFields = {
    displayname: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormfields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => {
        setFormfields(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventdefault();

        if(password != confirmPassword) {
            alert("passwords do not match")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfields({...formFields, [name]: value})
    };

    return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
            <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email} />
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
            <FormInput label="Confirm password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">Sign up</Button>
        </form>
    </div>
  )
}

export default SignUpForm 