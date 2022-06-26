import { useState } from 'react';
import React from "react"
import fb from '../../firebase';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const db = fb.firestore()
const Blogs = db.collection('blogs');
const options = [
    { value: 'varsity', label: 'Varsity' },
    { value: 'jv', label: 'Junior Varsity' },
    { value: 'white', label: 'White' },
    { value: 'blue', label: 'Blue' }
]



const CreateBlog = () => {
    const [title, SetTitle] = useState("");
    const [body, SetBody] = useState("");
    const [team, setTeam] = useState("");
    const navigate = useNavigate();

    const sub = (e) => {
        e.preventDefault();
        if (team == "") {
            alert("Please choose a team.")
            return
        }
        // Add data to the store
        Blogs.add({
            Title: title,
            Body: body,
            publish: false,
            published_on: fb.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleDateString(),
            team: team.value
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
                <input type="text" placeholder="Title"
                    onChange={(e) => { SetTitle(e.target.value) }} required />

                <textarea name="content" type="text" placeholder="Write your post here!"
                    rows="10" cols="150" onChange={(e) => { SetBody(e.target.value) }} required >
                </textarea>
                <Select placeholder="Which team?" options={options} onChange={setTeam} />

                <br />
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}

export default CreateBlog;