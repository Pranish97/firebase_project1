import {Link} from "react-router-dom";
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import logoImage from '../assets/images/logo.png';

export const Navbar = () =>{

    const [user] = useAuthState(auth);

    const signUserOut = async()=> {
        await signOut(auth);
    }

    return (
        <div className="navbar">
            <div className="logo">
            <Link to="/"> <img src={logoImage} width={100} height={100}/> </Link>
            </div>
            <div className="nabvar-menu">
            {user && <Link to="/home" className="home"> Home </Link>}
            {!user ? (<Link to="/login" className="login"> Login </Link>):
            (<Link to="/createpost" className="post"> Create Post </Link>)}
            {!user ? (<Link to="/signup" className="signup"> Signup </Link>):
            (<Link to="/createfact" className="generateFact"> Generate Fact </Link>
            )}
            </div>

            <div className="user-list">
                {user && (
                    <>
                <p className="user-text">{user?.displayName}</p>
                <img src={auth.currentUser?.photoURL || "" }  className="user-image" width={70} height={70}/>
                <button className="logout" onClick={signUserOut}>Logout</button>
                </>
            )}
            </div>
       </div>
    );
}