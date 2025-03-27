import { useState } from "react";
import { useEffect } from "react";
import { Comments } from "./comments.jsx";
import { Header } from "./header.jsx";
import { BlogContext } from "./context.jsx";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState({ id: "", username: "" });

  useEffect(() => {
    fetch("http://localhost:3000/posts", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("post data");
        console.log(data);
        setPosts(data);
      });
  }, []);

  const publishedPosts = posts.filter((post) => post.ispublished == true);

  return (
    <div>
      <BlogContext.Provider value={{ posts }}>
        <Header
        // token={localStorage.getItem("jwtToken")}
        // user={user}
        // setUser={setUser}
        />
        <h1>Clog (Cat Log)</h1>
        <div className="postcontainer">
          <ul className="posts">
            {publishedPosts.map((post) => {
              return (
                <li key={post.id}>
                  <b>{post.title}</b>
                  <br></br>
                  {post.body}
                  <br></br>
                  <Comments
                    postid={post.id}
                    key={post.id}
                    comments={post.comments}
                    user={localStorage.getItem("id")}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </BlogContext.Provider>
    </div>
  );
}

export { App };
