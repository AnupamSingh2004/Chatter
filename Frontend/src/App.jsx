import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from "@/pages/Auth/auth.jsx";
import Profile from "@/pages/Profile/profile.jsx";
import Chat from "@/pages/Chat/chat.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [userdata, setUserData] = useState({});
    const getUserData = async () => {

        try {
            const response = await axios.get('http://localhost:6005/login/sucess', {withCredentials: true});
            // console.log("response", response);
            setUserData(response.data.user);


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="*" element={<Auth/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/Chat"} element={<Chat/>}/>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
