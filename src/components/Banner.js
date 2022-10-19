import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fb from "../firebase";
import "../styles/banner.css"

const db = fb.firestore()
const emails = db.collection('emails');

function Banner(props) {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [subbed, setSubbed] = useState(false)


    if ((localStorage.getItem("subscribed") == "yes") && !(props.contact)) {
        return
    }

    const subscribe = () => {
        emails.add({
            email: email
        })

            .then((docRef) => {
                localStorage.setItem('subscribed', "yes");
                setSubbed(true)
                alert("Successfully Subscribed!")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        

    };
    if (subbed) {
        return
    }
    return (
        <>
        <div className="banner">
            <div className="banner_container">
                <h1>Subscribe for Email Updates!</h1><br/>
                <input
                    type="text"
                    className="email_box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <button
                    className="subscribe_btn"
                    onClick={subscribe}
                >
                    Subscribe
                </button>
            </div>
        </div>
        </>
    );
}
export default Banner;