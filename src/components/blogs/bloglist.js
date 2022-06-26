import React, { useState, useEffect }from 'react'
import { Link } from "react-router-dom";
import fb from '../../firebase';


const db = fb.firestore()
const Blogs = db.collection('blogs');


const Bloglist = () => {
    const [blogslist, setblogs] = useState([]);

    const DeleteBlog = (id)=> {
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
          setblogs(data);
        });

        // Detach listener
        return unsubscribe;
      }, []);

    return (
        <article>
      <h1>Posts</h1>
      <br/>
        {blogslist.map(blog => (
          <>
          <div class="post">
            <h2>{blog.Title}</h2>
            <br/>
            <p>{blog.Body}</p>
            <br/>
            <h3>{blog.published_on}</h3>
          </div>
          <Link to={"/admin/edit/" + blog.id}
              class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >Edit
            </Link>
            <button
              onClick={() => { DeleteBlog(blog.id) }}
            >Delete</button>
          <br/>
          </>
        ))}
      </article>
    );
  };

export default Bloglist;