import React, { useState, useEffect } from "react";
import fb from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import 'firebase/compat/storage';
import './styles/files.css'



var storage = fb.storage()

function FilesM() {
    const [data, setData] = useState([]);

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
    }, []);


    return (
        <div class="filesM">
            <br/>
            <h1>Files</h1>
            <br/>
            {
                data.map((val) => (
                    <div class="file">
                        <a href={val.link} download>{val.name}</a>
                        <br />
                        <br />
                    </div>
                ))
            }

        </div>
    );


}

export default FilesM;