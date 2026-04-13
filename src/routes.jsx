// routes.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Single from "./pages/Single";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/single" element={<Single />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
