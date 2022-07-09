import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Banner from "./components/Banner"

function Contact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div className="Contact">
      <br/>
      <Banner/>
      <br/>
      <h1>Contact Information</h1>
      <br/><br/>
      <h3>Email: <a href="mailto:Brent@tonka-tennis.com">Brent@tonka-tennis.com</a></h3>
      <br/>
      <h3>Phone Number: 952-261-7617</h3>
    </div>
  );
}
export default Contact;