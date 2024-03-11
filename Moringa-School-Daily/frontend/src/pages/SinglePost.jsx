// SinglePost.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Avatar from "../components/Avatar";
import Comments from "../components/Comments";
import { SchoolContext } from "../contexts/SchoolContext";
import Footer from "../components/Footer";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { URL } = useContext(SchoolContext);

  useEffect(() => {
    fetch(`${URL}/contents/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id,URL]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav />
      <div className="quick-actions pt-2 pb-2">
        <div className="container-lgs quick-links">
          <Link to="/"> {"< "} Back to HomePage</Link>
        </div>
      </div>
      <div className="container-lgs single-post">
        <div className="text-center">
          <div className="hero-top mt-4">
            <p className="mb-0">
              {post.category_id}
              <span> . 5 min read</span>
            </p>
          </div>
          <h3>{post.title}</h3>
          <Avatar height={40} />
          <strong>{`${post.added_by.firstname} ${post.added_by.lastname}`}</strong>
        </div>
      </div>
      <div className="post-image mt-3">
        <img src={post.image_url} alt=""></img>
      </div>
      <div className="container-lgs">
        <p className="text-center mt-5">{post.description}</p>
        <Comments comments={post.comments} />
      </div>
      <Footer />
    </>
  );
}
