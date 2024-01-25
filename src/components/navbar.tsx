import {Link} from "react-router-dom";
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";

export const Navbar = () =>{

    const [user] = useAuthState(auth);

    const signUserOut = async()=> {
        await signOut(auth);
        

    }
    return (
        <div className="navbar">
            <Link to="/" className="home"> Home </Link>
            {!user ? (<Link to="/login" className="login"> Login </Link>):
            (<Link to="/createpost" className="login"> Create Post </Link>
            )}

            <div className="user-list">
                {user && (
                    <>
                <p className="user-text">{user?.displayName}</p>
                <img src={auth.currentUser?.photoURL || "" }  className="user-image" width={50} height={50}/>
                <button className="logout" onClick={signUserOut}>Logout</button>
                </>
            )}
            </div>
       </div>
    );
}