import React, { useContext } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { SchoolContext } from "../contexts/SchoolContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Posts() {
  const { postData, userId, accessToken, URL } = useContext(SchoolContext);

  const handleDelete = (id) => {
    console.log("Clicked post with id", id);
    fetch(`${URL}/contents/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => {
        toast.success("Post deleted Successfully", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        console.error("Delete post failed:", error.message);
        toast.error("Post deletion Failed", {
          position: "bottom-center",
        });
      });
  };

  const filteredPosts = postData.filter((post) => post.public_status === true);

  return (
    <div className="container-lgs hero-top">
      <p>All Blog Posts</p>
      <div className="row g-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="col-sm-12 col-md-6 col-lg-4 blog-image mb-2"
            >
              <img src={post.image_url} alt="" />
              <p className="mt-3">
                {post.category_id}
                <span> . 5 min read</span>
              </p>
              <Link to={`/posts/${post.id}`}>
                <h4 className="post-title">{post.title}</h4>
              </Link>
              <p className="post-description">{post.description}</p>
              <div className="custom-avatar d-flex align-items-center justify-content-between">
                <div>
                  <Avatar height={40} alt="User Avatar" />{" "}
                  <strong>{`${post.added_by.firstname} ${post.added_by.lastname}`}</strong>
                </div>
                <div className="trash">
                  {userId === post.added_by.user_id ? (
                    <i
                      className="fa-solid fa-trash-can primary"
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                    ></i>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            No posts Available. Create one by clicking on
            <span>Add New Post</span>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
