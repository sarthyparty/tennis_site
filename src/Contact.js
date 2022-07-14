import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Banner from "./components/Banner"
import emailjs from 'emailjs-com';


function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ug2sz5t', 'template_53s49xu', form.current, 'zTMJuCBfMGQn0TYMG')
      .then((result) => {
        alert("Email Sent!")
      }, (error) => {
        alert("Email Failed Sending! Try later")
      });
  };
  return (
    <div className="Contact">
      <br />
      <Banner />
      <br />
      <h1>Contact Information</h1>
      <br /><br />
      <h3>Email: <a href="mailto:Brent@tonka-tennis.com">Brent@tonka-tennis.com</a></h3>
      <br />
      <h3>Phone Number: 952-261-7617</h3>
      <br/><br/>
      <h2>Send a Message</h2>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="from_name" placeholder="Name" />
        <input type="email" name="reply_to" placeholder="Email" />
        <br/>
        <br/>
        <textarea name="message" placeholder="Message" rows="10" cols="150"/>
        <br/>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
export default Contact;