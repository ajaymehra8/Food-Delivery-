import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
let navigate=useNavigate();
  const handleChange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://food-delivery-backend-gold.vercel.app/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail",cred.email)
      localStorage.setItem("authToken",json.authToken);

 navigate("/");
    }
  };
  
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={cred.email}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={cred.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createUser" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
