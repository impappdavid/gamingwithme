import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Players from "./pages/Players";
import Profile from "./pages/Profile";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="players" element={<Players />} />
            <Route path="/profile/:slug" element={<Profile />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
