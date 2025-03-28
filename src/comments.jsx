import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";
import "./comments.css";

function Comments({
  postid,
  postcomments,
  setComments,
  expand,
  setExpand,
  user,
}) {
  console.log("in comments ");
  console.log(postcomments);
  // const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    email: user,
  });
  // const [postcomments, setComments] = useState(comments);

  // const navigate = useNavigate();

  // const gotoPage = () => {
  //   console.log("gotoPage");
  //   navigate("/post/" + postid);
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, text: e.target.value });
  };
  const token = localStorage.getItem("jwtToken");

  const postComment = async (e) => {
    e.preventDefault();

    console.log(token);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/posts/${postid}/comments`,
        // `http://localhost:3000/posts/${postid}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // mode: "no-cors",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      getComments();
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/posts/${postid}/comments`,
        // `http://localhost:3000/posts/${postid}/comments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // mode: "no-cors",
          // body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      setExpand(false);
      setComments(data);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  console.log("postcomments length");
  console.log(postcomments);

  if (postcomments.length > 0) {
    return (
      <div>
        <p>Comments ({postcomments.length})</p>
        <ul>
          {postcomments.map((cmt) => {
            return (
              <li key={cmt.id}>
                {cmt.text}
                <br></br>author: {cmt.user.email}
              </li>
            );
          })}
        </ul>
        <div className="comments-footer">
          {expand ? (
            <form className="formfields" onSubmit={postComment}>
              <textarea
                className="textarea"
                name="text"
                id="text"
                value={formData.text}
                onChange={handleChange}
              />
              <button className="comment-button" type="submit">
                Leave Comment
              </button>
            </form>
          ) : (
            <>
              {/* <p className="close" onClick={() => setClicked(false)}>
                Close
              </p> */}
              <p className="add" onClick={() => setExpand(true)}>
                Add a comment!
              </p>
            </>
          )}
        </div>
      </div>
    );
  } else if (postcomments.length == 0) {
    return (
      <div>
        <p>Comments ({postcomments.length})</p>
        {expand ? (
          <form className="formfields" onSubmit={postComment}>
            <textarea
              className="textarea"
              name="text"
              id="text"
              value={formData.text}
              onChange={handleChange}
            />
            <button className="comment-button" type="submit">
              Leave Comment
            </button>
          </form>
        ) : (
          <p>There are no comments on this post.</p>
        )}
        <div className="comments-footer">
          {expand ? (
            ""
          ) : (
            <>
              {/* <p className="close" onClick={() => setClicked(false)}>
                Close
              </p> */}
              <p className="add" onClick={() => setExpand(true)}>
                Add a comment!
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export { Comments };
