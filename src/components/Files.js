import React, { useState, useEffect } from "react";
import fb from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import 'firebase/compat/storage';
import '../styles/files.css'
import { inferTypeFromValues } from "ra-core";
import { BsFillTrashFill } from "react-icons/bs"



var storage = fb.storage()

function Files() {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [data, setData] = useState([]);
    const [file_urls, setUrls] = useState([]);
    const [random, setRandom] = useState(Math.random());

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function deleteFile(name) {
        const deleteRef = ref(storage, `files/${name}`);
        deleteObject(deleteRef).then(() => {
            alert("Successfully Deleted File")
            const reRender = () => setRandom(Math.random());
        }).catch((error) => {
            alert(error)
        });
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload a file first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
                if (percent == 100) {
                    setTimeout(() => alert("Upload complete"), 100);
                }
            },
            (err) => console.log(err),
        );
    };

    useEffect(() => {
        storage.ref().child('files/').listAll()
            .then(res => {
                res.items.forEach((item) => {
                    item.getDownloadURL()
                        .then(function (response) {
                            setData(arr => [...arr, { name: item.name, link: response }]);
                        })
                })
            })
            .catch(err => {
                alert(err.message);
            })
    }, random);


    return (
        <div class="files">
            <input type="file" onChange={handleChange} accept="/*" />
            <button onClick={handleUpload}>Upload File</button>
            <p>{percent} "% done"</p>
            <br /><br />
            {
                data.map((val) => (
                    <div class="file">
                        <a href={val.link} download>{val.name}</a>
                        <button onClick={() => deleteFile(val.name)}><BsFillTrashFill /></button>
                        <br />
                        <br />
                    </div>
                ))
            }

        </div>
    );


}

export default Files;