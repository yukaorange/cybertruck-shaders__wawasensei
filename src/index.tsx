import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/scss/style.scss";
import { Leva } from "leva";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
    <Leva />
  </React.StrictMode>
);
