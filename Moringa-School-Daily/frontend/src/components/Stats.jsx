import React, { useContext } from "react";
import bloggerImage from "../assets/blogger.png";
import { SchoolContext } from "../contexts/SchoolContext";

export default function Stats() {
  const { postData, userCount } = useContext(SchoolContext);
  const adminData = userCount.filter((user) => user.role === "ADMIN");
  const techWritersData = userCount.filter(
    (user) => user.role === "TECH-WRITER"
  );
  const statsData = [
    { label: "No of Users", image: bloggerImage, count: userCount.length },
    { label: "No of Posts", image: bloggerImage, count: postData.length },
    { label: "No of Admins", image: bloggerImage, count: adminData.length },
    {
      label: "No of TechWriters",
      image: bloggerImage,
      count: techWritersData.length,
    },
  ];

  return (
    <div className="mt-3 container-lgs">
      <p className="dashboard-title">Stats</p>
      <div className="row gx-2">
        {statsData.map((stat, index) => (
          <div className="col-sm-3 col-md-6 col-lg-3 stats" key={index}>
            <div
              className={`p-3 bg-light ${stat.label.toLowerCase()} rounded-3 d-flex align-items-center`}
            >
              <div className="d-flex flex-column">
                {stat.label}
                <img src={stat.image} alt="" className="mt-1" />
              </div>
              <div className="digits">{stat.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
