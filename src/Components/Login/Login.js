import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { loginUser } from "./usersHelper";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 2px;
  background-color: #f9f9f9;
  width: 350px;
`;

const LoginButton = styled.button`
  padding: 0.5rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  };
  height: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  &:focus {
    border-bottom: 1px solid blue;
  }
  background-color: #f9f9f9;
  height: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: blue;
  cursor: pointer;
  align-self: flex-end;
`;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted");

		let payload = {
			email,
			password
		};

		loginUser(payload)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

  return (
    <div>
      <LoginContainer>
        <LoginForm>
          <h2>Welcome back!</h2>
          <h3>Log in to your account</h3>

          <Input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit" onClick={handleSubmit}>
            Login
          </LoginButton>
          <p>
            Don't have an account? <Link href="/register">Sign up</Link>
          </p>
          <ToastContainer />
        </LoginForm>
      </LoginContainer>
    </div>
  );
};

export default Login;