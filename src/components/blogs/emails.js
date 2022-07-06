import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import fb from '../../firebase';


const db = fb.firestore()
const Emails = db.collection('emails');


const EmailsList = () => {
    const { team } = useParams();
    const [emailslist, setemails] = useState([]);

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Emails.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setemails(data);
        });

        // Detach listener
        return unsubscribe;
    }, []);

    return (
        <article>
            <h1>Emails</h1>
            <br />
            {emailslist.map(blog => (
                <>
                    <div class="post">
                        <h2>{blog.email}</h2>
                    </div>
                    <br />
                    <br />
                </>
            ))}
        </article>
    );
};

export default EmailsList;