import React, { useContext, useState } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";
import Avatar from "../Avatar";

export default function ProfileModal() {
  const { accessToken, userId, URL } = useContext(SchoolContext);
  const [formData, setFormData] = useState({
    profile_picture: "",
    bio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`${URL}/profiles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData,"user_id": userId,}),
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
    <div
      className="modal fade"
      id="profileModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update your Profile 🤵‍♀️
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="text-center mt-3">
            <Avatar height={90}/>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="col-form-label">
                  Profile Picture Url
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="profile_picture"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="col-form-label">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bio"
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
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
