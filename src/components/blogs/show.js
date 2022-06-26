import React, { useState }from 'react'
import { useParams } from "react-router-dom";


import fb from '../../firebase';
const db = fb.firestore()
const Blogs = db.collection('blogs');


const BlogView = () => {
    const { id } = useParams();

    const [blog, setblog] = useState([]); 
    Blogs.doc(id).get().then((snapshot) => {
        const data = snapshot.data();
        setblog(data);
    });

    return (
        <div>
            <div className="w-full max-w-2xl mx-auto">       
                <h1 className="text-2xl">
                    <span><b>Title :</b></span>
                    <span>{blog.Title}</span>
                </h1>
                <p><b>Body :</b></p>
                <p>{blog.Body}</p>

            </div>            
        </div>
    );
};

export default BlogView;