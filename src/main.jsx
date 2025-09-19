import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignUp } from "./pages/signUp.jsx";
import { NotFound } from "./pages/not-found";
import { RouteProvider } from "./providers/router-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { ToastProvider } from "./components/base/toast";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import "./styles/globals.css";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard.jsx";
import Vendors from "./pages/vendors.jsx";
import Categories from "./pages/categories.jsx";
import Favorites from "./pages/favorites.jsx";
import Community from "./pages/community.jsx";
import Events from "./pages/events.jsx";
import Settings from "./pages/settings.jsx";
import VendorDetails from "./pages/vendorDetails.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import ForgotPasswordOtp from "./pages/forgotPasswordOtp.jsx";
import ChangePassword from "./pages/changePassword.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <ToastProvider>
                    <FavoritesProvider>
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
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/vendor-details/:id" element={<VendorDetails />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/forgot-password/otp" element={<ForgotPasswordOtp />} />
                                <Route path="/forgot-password/change" element={<ChangePassword />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </RouteProvider>
                    </FavoritesProvider>
                </ToastProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
