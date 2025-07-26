import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import { lazy } from "react";
import JustChatting from "./pages/JustChatting";
import Music from "./pages/Music";
import Tiktok from "./pages/Tiktok";
import Youtube from "./pages/Youtube";
import Games from "./pages/Games";
import Game from "./pages/Game";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Activehistory from "./pages/ActiveHistory";
import Danger from "./pages/Danger";
import CreateListing from "./pages/CreateListing";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute, { AdminProtectedRoute } from "@/components/ProtectedRoute";
import Gamers from "./pages/Gamers";
import SecurityPage from "./pages/Security";
import AdminPage from "./pages/Admin/Admin";
import AdminGames from "./pages/Admin/Games";
import AddGamePage from "./pages/Admin/AddGame";
import EditGamePage from "./pages/Admin/EditGame";
import AdminNotificationsPage from "./pages/Admin/Notifications";
import AddNewNotificationsPage from "./pages/Admin/AddNotification";
import CreateServicePage from "./pages/CreateService";
import CouponPage from "./pages/Coupon";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import FaqPage from "./pages/Faq";
import TermsPage from "./pages/TermsAndConditions";

const Profile = lazy(() => import('./pages/Profile'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/gamers" element={<Gamers />} />
            <Route path="/just-chatting" element={<JustChatting />} />
            <Route path="/music" element={<Music />} />
            <Route path="/tiktok" element={<Tiktok />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="/games" element={<Games />} /> 
            <Route path="/faq" element={<FaqPage />} /> 
            <Route path="/terms-and-conditions" element={<TermsPage />} /> 
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/create-service" element={<CreateServicePage />} />
              <Route path="/settings/general" element={<Settings />} />
              <Route path="/settings/history" element={<History />} />
              <Route path="/settings/active-history" element={<Activehistory />} />
              <Route path="/settings/security" element={<SecurityPage />} />
              <Route path="/settings/danger" element={<Danger />} />
              <Route path="/settings/coupon" element={<CouponPage />} />
            </Route>
            {/* Admin protected routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/games" element={<AdminGames />} />
              <Route path="/admin/games/create" element={<AddGamePage />} />
              <Route path="/admin/games/edit/:slug" element={<EditGamePage />} />
              <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
              <Route path="/admin/notifications/create" element={<AddNewNotificationsPage />} />
            </Route>
            <Route path="/games/:slug" element={<Game />} />
            <Route path="/profile/:slug" element={<Profile />} />
            {/*
              support --------------------------
              aboutus -------------------------
              download -------------------------
              terms-and-conditions ---------------------------
            */}
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
