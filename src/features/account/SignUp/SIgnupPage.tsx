import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupFormWidget from './SignupFormWidget';
import ConfirmSignupFormWidget from './ConfirmSignupFormWidget';

/**
 * This page controls which widget to show: the signup form or the confirmation form.
 * After successful signup, we display the confirmation widget.
 */
export default function SignupPage() {
    const [isConfirming, setIsConfirming] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <>
            <ToastContainer position="top-center" />
            {isConfirming ? (
                <ConfirmSignupFormWidget email={email} />
            ) : (
                <SignupFormWidget onSuccess={(userEmail) => {
                    setEmail(userEmail);
                    setIsConfirming(true);
                }} />
            )}
        </>
    );
}
