import React, { useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch('');

  const loginToApp = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then(
        (userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL
            }))
        }
    ).catch((error) => toast.error(error.message))
};

  const register = () => {
    if (!name) {
      toast.error("Please enter your fullname", {
        style: { background: "#363636", color: "#fff" },
      });
    }

    auth.createUserWithEmailAndPassword(email, password).then(
        (userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic
            })
            .then(() => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: name,
                        photoUrl: profilePic
                    })
                )
            })
        }
    ).catch((error) => toast.error(error))
  };

  return (
    <div className="login">
      <img
        src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
        alt=""
      />

      <form>
        <input
          onChange={e => setName(e.target.value)}
          placeholder="Full Name (required if registering)"
          type="text"
        />
        <input
          onChange={e => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />
        <input onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
