import {auth , provider} from "../config/firebase"; 
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const Login = () =>{

    const navigate = useNavigate();

    const signInWIthGoogle = async () =>{
       const result =  await signInWithPopup(auth, provider);
       console.log(result);
       navigate("/");
    }

    return (
        <div>
            <h1>
                <p>Sign In with Google</p>
                <button onClick={signInWIthGoogle}>Sign In With Google</button>
            </h1>
        </div>
    )
}