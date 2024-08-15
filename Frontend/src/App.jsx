
import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Auth from "@/pages/Auth/auth.jsx";
import Profile from "@/pages/Profile/profile.jsx";

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path=  "*" element={<Auth/>} />
          <Route path={"/profile"} element={<Profile/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
