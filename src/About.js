import {varsity_info, intro, jv_info, blue_info, white_info} from "./content/AboutPage"
import React from 'react';


function About() {
  return (
    <div className="Home">
        <article>
          <h1>About</h1>
          <p>{intro}</p>
          <h1>Varsity</h1>
          <p>{varsity_info}</p>
          <h1>Junior Varsity</h1>
          <p>{jv_info}</p>
          <h1>Blue Team</h1>
          <p>{blue_info}</p>
          <h1>White Team</h1>
          <p>{white_info}</p>
          <br/><br/>
        </article>
    </div>
  );
}

export default About;