import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./header.jsx";
import { Comments } from "./comments.jsx";

import "./post.css";

function Post() {
  const { postid } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postid}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("singlepost");
        // console.log(data);
        setPost(data);
        setAuthor(data.author);
        setComments(data.comments);
      });
  }, [postid]);

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
            {post.body}
            <br></br>
            <Comments
              postid={postid}
              key={postid}
              comments={comments}
              expand={true}
              user={localStorage.getItem("id")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Post };
