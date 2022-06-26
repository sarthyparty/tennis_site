import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import fb from '../../firebase';


const db = fb.firestore()
const Blogs = db.collection('blogs');


const Bloglist = () => {
    const { team } = useParams();
    const [blogslist, setblogs] = useState([]);

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

        // Detach listener
        return unsubscribe;
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
                    <Link to={"/admin/edit/" + blog.id}
                        class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                    >Edit
                    </Link>
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