// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes.jsx";
import useGlobalReducer from "./hooks/useGlobalReducer.jsx";

const AppWithContext = useGlobalReducer(AppRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(<AppWithContext />);
