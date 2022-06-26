import {useState} from 'react';
import React from "react"
import fb from '../../firebase';
import { useNavigate } from "react-router-dom";

const db = fb.firestore()
const Blogs = db.collection('blogs');

const CreateBlog= () => {
    const [title , SetTitle] = useState("");
    const [body , SetBody] = useState("");
    const navigate = useNavigate();

    const sub = (e) => {
        e.preventDefault();
        // Add data to the store
        Blogs.add({
            Title: title,
            Body: body,
            publish: false,
            published_on: fb.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleDateString()
        })
        .then((docRef) => {
            navigate('/admin')
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    return (
    <div>
        <form onSubmit={(event) => {sub(event)}}>    
            <input type="text" placeholder="Title" 
            onChange={(e)=>{SetTitle(e.target.value)}} required />

            <textarea  name="content" type="text" placeholder="write your content here" 
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea>

            <br/>
            <button type="submit">Submit</button>
        </form>
    </div>

    );
}

export default CreateBlog;