import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import fb from '../../firebase';
import {TiDelete} from "react-icons/ti"


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

    const DeleteEmail = (id) => {
        Emails.doc(id).delete().then(() => {
            alert("Successfully deleted email.")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    // const DeleteAllEmails = () => {
    //     Emails.doc.list().then(() => {
    //         alert("Successfully deleted email.")
    //     }).catch((error) => {
    //         console.error("Error removing document: ", error);
    //     });
    // };

    return (
        <article>
            <h1>Emails</h1>
            <br />
            <button>DELETE ALL</button>
            {emailslist.map(blog => (
                <>
                    <div class="post">
                    
                        <h2><TiDelete onClick={() => { DeleteEmail(blog.id) }}/>{blog.email}</h2>
                        
                    </div>
                    <br />
                    <br />
                </>
            ))}
        </article>
    );
};

export default EmailsList;