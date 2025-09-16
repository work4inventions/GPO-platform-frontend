import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignUp } from "./pages/signUp.jsx";
import { NotFound } from "./pages/not-found";
import { RouteProvider } from "./providers/router-provider";
import { ThemeProvider } from "./providers/theme-provider";
import "./styles/globals.css";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard.jsx";
import Vendors from "./pages/vendors.jsx";
import Categories from "./pages/categories.jsx";
import Favorites from "./pages/favorites.jsx";
import Community from "./pages/community.jsx";
import Events from "./pages/events.jsx";
import Profile from "./pages/profile.jsx";
import Settings from "./pages/settings.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/vendors" element={<Vendors />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
