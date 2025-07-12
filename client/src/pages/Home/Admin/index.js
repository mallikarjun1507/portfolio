import { Tabs } from "antd";
import React from "react";
import Header from "../../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import { useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProject from "./AdminProject";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  const tabItems = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experience",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProject />,
    },
    {
      key: "5",
      label: "Courses",
      children: <AdminCourses />,
    },
    {
      key: "6",
      label: "Contact",
      children: <AdminContact />,
    },
  ];

  return (
    <div>
          <Header />
          <h1 className="text-2xl px-5 py-2 text-primary">Portfolio Admin</h1>
      {portfolioData && (
        <div className="mt-5 px-5 pb-10">
          <Tabs defaultActiveKey="1"  items={tabItems} />
        </div>
      )}
    </div>
  );
}

export default Admin;
