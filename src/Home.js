// import FadeIn from "react-fade-in";
import { Slideshow } from "./components/Slideshow";

function Home() {
  return (
    <div className="Home">
        <article>
          <h1>Home</h1>
          This is the home page will have continuous slideshow of pictures going
          and info about the team.
          <br/><br/>
          <Slideshow/>
        </article>
    </div>
  );
}

export default Home;
