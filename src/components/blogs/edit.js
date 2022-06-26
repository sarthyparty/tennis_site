import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import fb from '../../firebase';
const db = fb.firestore()
const Blogs = db.collection('blogs');


const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [title, SetTitle] = useState("");
    const [body, SetBody] = useState("");

    useEffect(() => {
        Blogs.doc(id).get().then((snapshot) => {
            const data = snapshot.data();
            SetTitle(data.Title);
            SetBody(data.Body);
        });
    }, []);

    const sub = (e) => {
        e.preventDefault();

        // Add data to the store
        Blogs.doc(id).update({
            Title: title,
            Body: body,
            last_Updated: fb.firestore.Timestamp.fromDate(new Date())
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

            <form onSubmit={(event) => { sub(event) }}>
                <input type="text" placeholder="Title" value={title}
                    onChange={(e) => { SetTitle(e.target.value) }} required />

                <textarea name="content" type="text" value={body}
                    placeholder="edit your content here"
                    rows="10" cols="150" onChange={(e) => { SetBody(e.target.value) }} required >
                </textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BlogEdit;