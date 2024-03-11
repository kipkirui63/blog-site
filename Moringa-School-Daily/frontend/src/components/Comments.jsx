import React, { useContext, useState } from "react";
import Avatar from "./Avatar";
import AuthButton from "./AuthButton";
import { useParams } from "react-router-dom";
import { SchoolContext } from "../contexts/SchoolContext";

export default function Comments({ comments }) {
  const { id } = useParams();
  const { accessToken, userId, user, URL } = useContext(SchoolContext);
  const [formData, setFormData] = useState({
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`${URL}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, user_id: userId, content_id: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        alert("Post added successfully");
        console.log("Profile added successfully");
      })
      .catch((error) => {
        console.error("Error adding profile:", error.message);
      });
  };

  const handleOnChange = (e) => {
    const key = e.target.id;
    setFormData({ ...formData, [key]: e.target.value });
  };
  return (
    <div className="comments-posting">
      <div className="d-flex justify-content-center">
        <div className="comments-icons ">
          <i
            className="fa-solid fa-comment-dots"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
          ></i>
          <p className="comments ms-1">{comments.length}</p>
        </div>
        <div className="comments-icons ms-3">
          <i className="fa-solid fa-thumbs-up"></i>
          <p className="comments ms-1">5</p>
        </div>
        <div className="comments-icons ms-3">
          <i className="fa-solid fa-floppy-disk"></i>
          <p className="comments ms-1">5</p>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Comments ({comments.length})
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Avatar height={40} />
          <strong>{user}</strong>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <textarea
                className="form-control"
                id="comment"
                aria-describedby="comment section"
                placeholder="What are your Thoughts"
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-3">
              <AuthButton name="Comment" />
            </div>
          </form>
          <hr />
          {comments.length > 0
            ? comments.map((comment, index) => (
                <div key={index}>
                  <p className="mb-0">{comment.comment}</p>
                  <p className="comment-user mt-0">~ By {comment.user}</p>
                </div>
              ))
            : "No comments Available"}
        </div>
      </div>
    </div>
  );
}
