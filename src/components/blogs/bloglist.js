import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import fb from '../../firebase';


const db = fb.firestore()
const Blogs = db.collection('blogs');
const Emails = db.collection('emails');


const Bloglist = () => {
    const { team } = useParams();
    const [blogslist, setblogs] = useState([]);
    const [emailslist, setemails] = useState("")
    const navigate = useNavigate();


    function filterTeam(post) {
        if (team == undefined) {
            return post.team == "varsity"
        }
        return post.team == team;
    }

    const DeleteBlog = (id) => {
        Blogs.doc(id).delete().then(() => {
            alert("Post successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    const edit = (id) => {
        navigate("/admin/edit/" + id)
    }

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Blogs.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Update state
            const posts = data.filter(filterTeam)
            setblogs(posts);
        });

        const unsubscribe2 = Emails.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            let emails = ""
            for (let i = 0; i < data.length; i++) {
                emails += data[i].email + ","
            }
            setemails(emails.slice(0, -1));
        });

        // Detach listener
        return unsubscribe, unsubscribe2;
    }, []);

    return (
        <article>
            <h1>Posts</h1>
            <div class="tabs">
                <Link to="/admin/varsity" onClick={() => team = "varsity"}>Varsity</Link>
                <Link to="/admin/jv" onClick={() => team = "jv"}>Junior Varsity</Link>
                <Link to="/admin/white" onClick={() => team = "white"}>White</Link>
                <Link to="/admin/blue" onClick={() => team = "blue"}>Blue</Link>
            </div>
            <br />
            {blogslist.map(blog => (
                <>
                    <div class="post">
                        <h2>{blog.Title}</h2>
                        <br />
                        <p>{blog.Body}</p>
                        <br />
                        <h3>{blog.published_on}</h3>
                    </div>
                    <a href={"mailto:" + emailslist + "?subject=" + blog.Title + "title&body=" + blog.Body}>
                        <button id="btnOutlook">Send Email</button>
                    </a>
                    <button onClick={edit}>Edit</button>
                    
                    <button
                        onClick={() => { DeleteBlog(blog.id) }}
                    >Delete</button>
                    <br />
                    <br />
                </>
            ))}
        </article>
    );
};

export default Bloglist;