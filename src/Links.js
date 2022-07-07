import React from 'react';
import { links } from "./content/LinksPage"

function Links() {
    return (
        <div className="Contact">
            <article>
                <h1>Links</h1>
                <br />
                {links.map(link => (
                    <>
                        <div class="iframe">
                            <h2>{link.name}</h2>
                            <br />
                            <iframe src={link.link} />
                        </div>
                        <br />
                    </>
                ))}

            </article>
        </div>
    );
}

export default Links;

