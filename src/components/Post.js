import { React } from "react";
import "../styles/post.css";

function Post(props) {
  <div class="post">
    <h1>{props.title}</h1>
    <p>{props.content}</p>
    <h3>{props.date}</h3>
  </div>;
}

export default Post;
