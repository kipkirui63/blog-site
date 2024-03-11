import React, { useContext } from "react";
import Nav from "../components/Nav";
import QuickActions from "../components/QuickActions";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import UsersTable from "../components/UsersTable";
import PostsTable from "../components/PostsTable";
import { SchoolContext } from "../contexts/SchoolContext";
import Footer from "../components/Footer";

export default function Administration() {
  const { userRole } = useContext(SchoolContext);
  return (
    <>
      <Nav />
      <QuickActions />
      <Hero />
      {userRole === "ADMIN" ? (
        <>
          <Stats />
          <hr className="mt-4" />
          <UsersTable />
          <hr className="mt-4" />
        </>
      ) : null}
      {userRole !== "USER" ? <PostsTable /> : null}
      <Footer />
    </>
  );
}
