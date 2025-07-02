import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
