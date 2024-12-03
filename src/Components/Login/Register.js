import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "./usersHelper";

const Regcontainer = styled.div`
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

const Largebutton = styled.button`
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
  }, [name, email, password]);

   
  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password.length > 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleRegister = (e) => {
    e.preventDefault();
  
    if (!validateFields()) {
      return;
    }
  
    let payload = { name, email, password };

  registerUser(payload)
    .then((data) => {
      if (data.error) {
        toast.error("Error: " + data.error);
      } else {
        toast.success("User registered successfully");
        setName("");
        setEmail("");
        setPassword("");
      }
    })
    .catch((error) => {
      toast.error("Error: " + error.message);
    });
  };

  return (
    <Regcontainer className="container">
      <LoginForm>
        <h2>Welcome</h2>
        <h3>Create your account</h3>

        <Input
          type="text"
          placeholder="Enter your name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: null });
          }}
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <Input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: null });
          }}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <Input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: null });
          }}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <Largebutton
          type="submit"
          onClick={handleRegister}
        >
          Submit
        </Largebutton>
        <ToastContainer />
      </LoginForm>
    </Regcontainer>
  );
};

export default Register;