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
import ProtectedRoute from "@/components/ProtectedRoute";
import Gamers from "./pages/Gamers";
import SecurityPage from "./pages/Security";

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
            <Route path="/gamers" element={<Gamers />} />
            <Route path="/just-chatting" element={<JustChatting />} />
            <Route path="/music" element={<Music />} />
            <Route path="/tiktok" element={<Tiktok />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="/games" element={<Games />} /> 
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/settings/general" element={<Settings />} />
              <Route path="/settings/history" element={<History />} />
              <Route path="/settings/active-history" element={<Activehistory />} />
              <Route path="/settings/security" element={<SecurityPage />} />
              <Route path="/settings/danger" element={<Danger />} />
            </Route>
            <Route path="/games/:slug" element={<Game />} />
            <Route path="/profile/:slug" element={<Profile />} />
            {/*
              become
              support --------------------------
              coupon
              aboutus -------------------------
              faq -------------------------
              download -------------------------
              admin
              admin/game
              admin/game/create
              admin/game/edit/:slug
              admin/notification
              admin/notification/create
              terms-and-conditions ---------------------------
            */}
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
