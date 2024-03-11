import React, { useContext } from "react";
import Avatar from "./Avatar";
import { SchoolContext } from "../contexts/SchoolContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsersTable() {
  const { userCount, accessToken, URL } = useContext(SchoolContext);

  const handleRoleChange = (role, id) => {
    console.log(`The role is ${role} and id ${id}`);

    fetch(`${URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        toast.success(`Role changed to ${role}`, {
          position: "bottom-center",
        });
        console.log(`Role changed to ${role}`);
      })
      .catch((error) => {
        console.error("Error changing post:", error.message);
      });
  };

  const handleDeleteUser = (id) => {
    console.log(`This is user ${id}`);
    fetch(`${URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(() => {
        toast.success("User deleted Successfully", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        console.error("Delete user failed:", error.message);
        toast.error("User deletion Failed", {
          position: "bottom-center",
        });
      });
  };
  return (
    <div className="container-lgs mt-3">
      <p className="dashboard-title">Manage Users</p>
      <div className="table-responsive text-nowrap">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          {userCount &&
            userCount.map((user) => (
              <tbody key={user.id}>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar height={45} />
                      <div className="ms-3">
                        <p className="mb-1">
                          {user.firstname} {user.lastname}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <p className="fw-normal mb-1">{user.role}</p>
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
                          onClick={() => handleRoleChange("ADMIN", user.id)}
                        >
                          Make Admin
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleRoleChange("TECH-WRITER", user.id)
                          }
                        >
                          Make Tech-Writer
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete User
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
