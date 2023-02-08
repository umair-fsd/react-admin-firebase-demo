// LoginPage.js
import React from "react";
import { Login, LoginForm , AUTH_LOGIN } from "react-admin";

const CustomLoginForm = (props) => (
  <div>
    <div style={{ fontFamily: "monospace", marginLeft: "15px" }}>
      <p>Username: test@example.com</p>
      <p>Password: password</p>
    </div>
    <LoginForm {...props} />
  </div>
);

const CustomLoginPage = (props) => {
  console.log('AUTH_LOGIN',AUTH_LOGIN)
  return (
    <Login loginForm={<CustomLoginForm />} {...props} />
  )
} 

export default CustomLoginPage;
