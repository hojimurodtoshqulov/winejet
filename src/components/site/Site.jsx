import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default function Site() {
  const htmlElement = document.querySelector("html");
  htmlElement.classList.add("not-adminPages");

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
