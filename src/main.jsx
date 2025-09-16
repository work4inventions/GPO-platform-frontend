import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignUp } from "./pages/signUp.jsx";
import { NotFound } from "./pages/not-found";
import { RouteProvider } from "./providers/router-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { ToastProvider } from "./components/base/toast";
import "./styles/globals.css";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import ForgotPasswordOtp from "./pages/forgotPasswordOtp.jsx";
import ChangePassword from "./pages/changePassword.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <ToastProvider>
                    <RouteProvider>
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/forgot-password/otp" element={<ForgotPasswordOtp />} />
                            <Route path="/forgot-password/change" element={<ChangePassword />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </RouteProvider>
                </ToastProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
