import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateLayer";
import "./Login.css";

function Login() {
  const [state, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src="https://cdn.worldvectorlogo.com/logos/tinder-2.svg" alt="" />
        <h1>Sign in to Tinder</h1>
        <Button onClick={signIn} variant="contained">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
