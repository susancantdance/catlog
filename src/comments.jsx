import { useState } from "react";

import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";
import "./comments.css";

function Comments({ postid, comments, expand, user }) {
  // console.log("in comments ");
  // console.log(comments);
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    email: user,
  });
  const [postcomments, setComments] = useState(comments);

  const navigate = useNavigate();

  const gotoPage = () => {
    console.log("gotoPage");
    navigate("/post/" + postid);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, text: e.target.value });
  };

  const postComment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/posts/${postid}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      setComments({ ...postcomments, text: data });
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  // console.log("expand");
  // console.log(expand);

  if ((clicked || expand) && postcomments.length > 0) {
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
              <p className="close" onClick={() => setClicked(false)}>
                Close
              </p>
              <p className="add" onClick={gotoPage}>
                Add a comment!
              </p>
            </>
          )}
        </div>
      </div>
    );
  } else if ((clicked || expand) && postcomments.length == 0) {
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
              <p className="close" onClick={() => setClicked(false)}>
                Close
              </p>
              <p className="add" onClick={gotoPage}>
                Add a comment!
              </p>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p className="comments-title" onClick={() => setClicked(true)}>
          Comments ({postcomments.length})
        </p>
      </div>
    );
  }
}

export { Comments };
