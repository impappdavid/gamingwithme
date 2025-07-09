import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Players from "./pages/Players";
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

const Profile = lazy(() => import('./pages/Profile'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/players" element={<Players />} />
            <Route path="/just-chatting" element={<JustChatting />} />
            <Route path="/music" element={<Music />} />
            <Route path="/tiktok" element={<Tiktok />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:slug" element={<Game />} />
            <Route path="/settings/general" element={<Settings />} />
            <Route path="/settings/history" element={<History />} />
            <Route path="/settings/active-history" element={<Activehistory />} />
            <Route path="/settings/danger" element={<Danger />} />
            <Route path="/profile/:slug" element={<Profile />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
