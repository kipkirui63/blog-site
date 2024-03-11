import React, { useContext } from "react";
import { SchoolContext } from "../contexts/SchoolContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function PostsTable() {
  const { postData, accessToken, URL } = useContext(SchoolContext);
  const approvePost = (id) => {
    fetch(`${URL}/contents/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_status: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        toast.success(`Post status changed`, {
          position: "bottom-center",
        });
        console.log(`Post status changed`);
      })
      .catch((error) => {
        console.error("Error changing post status:", error.message);
      });
  };

  const handleDelete = (id) => {
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
  
  return (
    <div className="container-lgs mt-3 ">
      <p className="dashboard-title">Manage Posts</p>
      <div className="table-responsive text-nowrap">
        <table className="table align-middle mb-0 bg-white table-responsive">
          <thead className="bg-light">
            <tr>
              <th>Post Title</th>
              <th>Link</th>
              <th>Post Type</th>
              <th>Added By</th>
              <th>Public Status</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {postData &&
            postData.map((post) => (
              <tbody key={post.id}>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-2">
                        <p className="mb-1">{post.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link to={`/posts/${post.id}`}>Link</Link>
                  </td>
                  <td>{post.content_type}</td>
                  <td>
                    <p className="fw-normal mb-1">
                      {post.added_by.firstname} {post.added_by.lastname}
                    </p>
                  </td>
                  <td>
                    <p
                      className={`fw-normal mb-1 ${
                        post.public_status ? "text-success" : "text-warning"
                      }`}
                    >
                      {post.public_status ? "Approved" : "Not Approved"}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{post.published_date}</p>
                  </td>
                  <td>
                    <span
                      className="badge bg-success rounded-pill d-inline dropdown-toggle custom-badge"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </span>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => approvePost(post.id)}
                        >
                          Approve Post
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDelete(post.id)}
                        >
                          Remove Post
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
