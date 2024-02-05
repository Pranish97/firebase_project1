import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import googleImage from "../assets/images/google.webp"

export const Login = () => {
    const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Signed in user
      const user = userCredential.user;
      console.log(user);

      // Fetch user data from Firestore based on email
      const usersCollection = collection(db, 'user');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        navigate("/home");
      } else {
        console.error('User not found in Firestore.');
      }
    } catch (error:any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/home");
    } catch (error:any) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className='login-box'>
    <div className='login-form'>
        <p className='login-title'>Login To MeowFun</p>
        <p className='welcome'>Welcome Back</p>
        <form>
            <label className='login-email' htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              onClick={() => setActive(true)} className={active ? "emailB-box" : "email-box"}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className='login-password' htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onClick={() => setActive(true)} className={active ? "passwordB-box" : "password-box"}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <a className='forget'>Forget Password?</a>

            <button
              type="button"
              onClick={onLogin}
              className='login-button'
            >
              Login
            </button>
        </form>
        <hr style={{marginTop:"40px", marginRight:"300px", width:"210px", float:"left"}}></hr><p style={{color:"grey", marginLeft:"220px", fontSize:"20px",marginTop:"-20px",width:"100px", float:"left"}}>OR</p>
        <hr style={{ width:"210px", float:"left",marginTop:"-8px"}}></hr>
        <button onClick={signInWithGoogle} className='google'><img src={googleImage} height={20} width={20} className='googleImage' />Sign In With Google</button>
        <a href='/signup' className='signupLink'>Create an Account</a>
    </div>
    </div>
  );
};
