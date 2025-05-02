import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./header.jsx";
import { Comments } from "./comments.jsx";
// import env from "react-dotenv";

import "./post.css";

function Post() {
  console.log("this is POST");
  const { postid } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [expand, setExpand] = useState(false);

  console.log(`postid ${postid}`);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DB_URL}/posts/${postid}`, {
      // fetch(`http://localhost:3000/posts/${postid}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("singlepost");
        console.log(data);
        setPost(data);
        setAuthor(data.author);
        setComments(data.comments);
      });
  }, [postid]);

  console.log("COMMENTS");
  console.log(comments);

  return (
    <div>
      <div>
        <Header
        // token={localStorage.getItem("jwtToken")}
        // user={user}
        // setUser={setUser}
        />
        <h1>Clog (Cat Log)</h1>
        <div className="post">
          <div key={postid} className="postbody">
            <b>{post.title}</b>
            <br></br>
            <p className="author">Author: {author.email}</p>
            <p className="bodytext">{post.body}</p>
            <br></br>
            <Comments
              postid={postid}
              postcomments={comments}
              setComments={setComments}
              expand={expand}
              setExpand={setExpand}
              user={localStorage.getItem("id")}
              key={postid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Post };
