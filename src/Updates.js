import "./styles/post.css"
import React, { useState, useEffect } from 'react';
import fb from './firebase';

const db = fb.firestore()
const Blogs = db.collection('blogs');

function Updates() {

  const [blogslist, setblogs] = useState([]);

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
      console.log(data)
    });

    // Detach listener
    return unsubscribe;
  }, []);
  return (
    <div className="Updates">
      <article>
      <h1>Updates</h1>
      <br/>
        {blogslist.map(blog => (
          <>
          <div class="post">
            <h2>{blog.Title}</h2>
            <br/>
            <p>{blog.Body}</p>
            <br/>
            <h3>{blog.published_on}</h3>
            {/* <h3>{blog}</h3> */}
            {/* <Link to={"/admin/edit/" + blog.id}
              class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >Edit
            </Link>
            <button
              onClick={() => { DeleteBlog(blog.id) }}
            >delete</button> */}
          </div>
          <br/>
          </>
        ))}
      </article>
    </div>
  );
}

export default Updates;
