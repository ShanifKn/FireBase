import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";

export const Login = () => {
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div>
        {" "}
        <h3> Register User </h3>
        <input
          type="Email"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={register}>Create User</button>
      </div>
      <div>
        <h3>Login</h3>
        <input
          type="Email"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        />
        <button onClick={login}>Login</button>
      </div>
      <h4>User Logged In:</h4>
      {user?.email}
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};
