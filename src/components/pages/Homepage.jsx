import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

function Homepage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
            navigate("/create", { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
            navigate("/create", { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    // const logout = async (e) => {
    //     e.preventDefault();
    //     await signOut(auth);
    // };

    const handleClickRegister = (e) => {
        e.preventDefault();
        register();
        setEmail("");
        setPassword("");
    };

    const handleClickLogin = (e) => {
        e.preventDefault();
        login();
        setEmail("");
        setPassword("");
    };

    return (
        <div className="home-div">
            <h3 className="">Sign In</h3>
            <div className="sign-in">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className="home-btn">
                    <button onClick={handleClickLogin} className="btn">
                        Sign In
                    </button>
                    <button onClick={handleClickRegister} className="btn">
                        Sign Up
                    </button>
                </div>
                {/* <button onClick={logout} className="btn">
                Sign Out
            </button> */}
            </div>
        </div>
    );
}

export default Homepage;
