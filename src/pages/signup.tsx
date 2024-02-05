import signupImage from '../assets/images/signup.webp';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '../config/firebase';
import { addDoc, collection } from "firebase/firestore";
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';


interface CreateUserData {
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
}

  
  export const Signup = () => {

    const [active, setActive] = useState(false);


    const navigate = useNavigate();
    const schema = yup.object().shape({
      username: yup.string().required("Your Full Name is Required!"),
      email: yup.string().email().required("Email is Required!"),
      password: yup.string().min(4).max(20).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords Don't Match")
        .required(),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = async (data: CreateUserData) => {
        try {
          const auth = getAuth();
      
          // Create user in Firebase Authentication
          await createUserWithEmailAndPassword(auth, data.email, data.password);
      
          // Add user data to Firestore
          const usersCollection = collection(db, 'user');
          await addDoc(usersCollection, {
            ...data,
          });
      
          // Navigate to the login page without logging the user in
          navigate("/login");
      
          console.log('User registered successfully:', data);
        } catch (error: any) {
          console.error('Error registering user:', error.message);
        }
      };
      

    return (
        <div className='signup-box'>
        <div className='signup-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className='register'>Register Into MeowFun</p>
            <label className='usernameText'>Full Name</label>
      <input onClick={() => setActive(true)} className={active ? "usernameB" : "username"} type="text"  {...register("username")} />
      <p style={{ color: 'red', marginRight:'280px'}}>{errors.username?.message}</p>
      <label className='emailText'>Email Address</label>
      <input onClick={() => setActive(true)} className={active ? "emailB" : "email"} type="text" {...register("email")} />

      <p style={{ color: 'red', marginRight:'360px'}}>{errors.email?.message}</p>
      <label className='passwordText'>Password</label>
      <input 
      onClick={() => setActive(true)} className={active ? "passwordB" : "password"}
        type="password"
        {...register("password")}
      />
      <p style={{ color: 'red', marginRight:'290px',  width:'350px'}}>{errors.password?.message}</p>
      <label className='cpasswordText'>Confirm Password</label>
      <input 
      onClick={() => setActive(true)} className={active ? "cpasswordB" : "cpassword"}
        type="password"
        {...register("confirmPassword")}
      />
      <p style={{ color: 'red', marginLeft:'20px', width:'290px'}}>{errors.confirmPassword?.message}</p>
      <input className='submitUser' type="submit" placeholder='Register' />
    <p className='already'>Already have an account?<a href='/login' className='loginLink'>Login</a></p>
    </form>
    </div>
    </div>
    )
}