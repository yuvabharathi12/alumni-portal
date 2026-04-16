import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

// Show scrollbar on right edge hover
let hideTimer;
document.addEventListener("mousemove", (e) => {
  const html = document.documentElement;
  const nearRightEdge = window.innerWidth - e.clientX < 40;
  
  clearTimeout(hideTimer);
  
  if (nearRightEdge && document.body.scrollHeight > window.innerHeight) {
    html.classList.add("scrollbar-visible");
  } else {
    hideTimer = setTimeout(() => {
      html.classList.remove("scrollbar-visible");
    }, 500);
  }
});

document.addEventListener("mouseleave", () => {
  document.documentElement.classList.remove("scrollbar-visible");
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
