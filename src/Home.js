// import FadeIn from "react-fade-in";
import { Slideshow } from "./components/Slideshow";
import React from 'react';


function Home() {
  return (
    <div className="Home">
        <article>
          <h1>Welcome!</h1>
          <br/><br/>
          <Slideshow/>
        </article>
    </div>
  );
}

export default Home;
