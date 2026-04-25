import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { router } from "./routes";
import { ContactProvider } from "./context/ContactContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContactProvider>
            <RouterProvider router={router} />
        </ContactProvider>
    </React.StrictMode>
);
