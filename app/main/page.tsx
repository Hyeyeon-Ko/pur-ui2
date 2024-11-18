"use client";

import dynamic from "next/dynamic";
const DashboardBody = dynamic(() => import("./page.body"));

const Dashboard = () => {
  return <DashboardBody />;
};

export default Dashboard;
