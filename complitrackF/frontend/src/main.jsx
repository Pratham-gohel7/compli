import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormProvider } from "./pages/context/FormContext";
import "./index.css"; // Ensure this is pointing to your CSS file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
);
