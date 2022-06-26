import "./styles/post.css"
import React, { useState, useEffect } from 'react';
import fb from './firebase';
import { Link, useParams } from "react-router-dom";

const db = fb.firestore()
const Blogs = db.collection('blogs');

function Updates() {

  const { team } = useParams();
  const [blogslist, setblogs] = useState([]);

  function filterTeam(post) {
    if (team == undefined) {
      return post.team == "varsity"
    }
    return post.team == team;
  }

  function setTeam(new_team) {
    team = new_team
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

    // Detach listener
    return unsubscribe;
  }, []);
  return (
    <div className="Updates">
      <article>
        <h1>Updates</h1>
        <div class="tabs">
          <Link to="/updates/varsity" onClick={() => setTeam("varsity")}>Varsity</Link>
          <Link to="/updates/jv" onClick={() => setTeam("jv")}>Junior Varsity</Link>
          <Link to="/updates/white" onClick={() => setTeam("white")}>White</Link>
          <Link to="/updates/blue" onClick={() => setTeam("blue")}>Blue</Link>
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
              {/* <h3>{blog}</h3> */}
              {/* <Link to={"/admin/edit/" + blog.id}
              class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >Edit
            </Link>
            <button
              onClick={() => { DeleteBlog(blog.id) }}
            >delete</button> */}
            </div>
            <br />
          </>
        ))}
      </article>
    </div>
  );
}

export default Updates;
