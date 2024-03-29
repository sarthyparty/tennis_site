import React, { useState, useEffect, updateState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import fb from '../../firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const db = fb.firestore()
const Blogs = db.collection('blogs');
const Emails = db.collection('emails');


const Bloglist = () => {
    const { team } = useParams();
    const [teamname, setTeam] = useState(team);
    const [allblogs, setallblogs] = useState([]);
    const [blogslist, setblogs] = useState([]);
    const [emailslist, setemails] = useState("")
    const [emailslist2, setemails2] = useState("")
    const navigate = useNavigate();
    const forceUpdate = React.useCallback(() => updateState({}), []);



    function filterTeam(team, data = []) {
        console.log(team)
        if (team == undefined) {
            team = "general"
        }
        setTeam(team)
        let new_blogs = []
        for (let i = 0; i < allblogs.length; i++) {
            if (allblogs[i].team == team) {
                new_blogs.push(allblogs[i])
            }
        }

        setblogs(new_blogs)
        return new_blogs
    }

    function filterT(team, blogs) {
        console.log(team)
        if (team == undefined) {
            team = "general"
        }
        setTeam(team)
        let new_blogs = []
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].team == team) {
                new_blogs.push(blogs[i])
            }
        }
        return new_blogs
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const DeleteBlog = (id) => {
        Blogs.doc(id).delete().then(() => {
            forceUpdate.call();
            alert("Successfully deleted post.")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    const edit = (id) => {
        console.log(id)
        navigate("/admin/edit/" + id)
    }

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Blogs.orderBy('published_on', 'desc').limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Update state
            setallblogs(data)
            const blogs = filterT(teamname, data)
            setblogs(blogs)

        });

        const unsubscribe2 = Emails.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            let emails = ""
            for (let i = 0; i < data.length; i++) {
                emails += data[i].email + "; "
            }
            setemails(emails.slice(0, -2));
            let emails2 = ""
            for (let i = 0; i < data.length; i++) {
                emails2 += data[i].email + ","
            }
            setemails2(emails2.slice(0, -1));
        });

        // Detach listener
        return unsubscribe, unsubscribe2;
    }, []);
    return (
        <article>
            <h1>Posts</h1>
            <CopyToClipboard text={emailslist}>
                <input type="button" onClick={() => alert("copied emails!")} value="Copy Emails" />
            </CopyToClipboard>
            <div class="tabs">
                <Link to="/admin" onClick={() => filterTeam("general")}>General</Link>
                <Link to="/admin/varsity" onClick={() => filterTeam("varsity")}>Varsity</Link>
                <Link to="/admin/jv" onClick={() => filterTeam("jv")}>Junior Varsity / Junior Varsity 2</Link>
                <Link to="/admin/white" onClick={() => filterTeam("white")}>White</Link>
                <Link to="/admin/blue" onClick={() => filterTeam("blue")}>Blue</Link>
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
                    <button onClick={() => edit(blog.id)}>Edit</button>

                    <button
                        onClick={() => { DeleteBlog(blog.id) }}
                    >Delete</button>

                    <a href={"mailto:Brent@tonka-tennis.com?bcc=" + emailslist2 + "&subject=" + capitalizeFirstLetter(blog.team) + " Update: " + blog.Title + "&body=" + blog.Body}>
                        <button id="btnOutlook">Send Email</button>
                    </a>
                    <CopyToClipboard text={emailslist}>
                        <a href={"mailto:Brent@tonka-tennis.com?subject=" + capitalizeFirstLetter(blog.team) + " Update: " + blog.Title}>
                            <button id="btnOutlook">Compact Email</button>
                        </a>
                    </CopyToClipboard>
                    <br />
                    <br />
                </>
            ))}
        </article>
    );
};

export default Bloglist;