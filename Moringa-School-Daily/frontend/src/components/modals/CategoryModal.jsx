import React, { useContext, useState } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryModal() {
  const { accessToken, userId, URL } = useContext(SchoolContext);
  const [formData, setFormData] = useState({
    name: "",
    user_id: userId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`${URL}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        toast.success("Category added Successfully", {
          position: "bottom-center",
        });
        console.log("Category added successfully");
      })
      .catch((error) => {
        console.error("Error adding post:", error.message);
      });
  };

  const handleOnChange = (e) => {
    const key = e.target.id;
    setFormData({ ...formData, [key]: e.target.value });
  };

  return (
    <div
      className="modal fade"
      id="categoryModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create a New Category 📜
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="col-form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary auth-btn">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
