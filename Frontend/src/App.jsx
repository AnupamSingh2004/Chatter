import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "@/pages/Auth/auth.jsx";
import Profile from "@/pages/Profile/profile.jsx";
import Chat from "@/pages/Chat/chat.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {RecoilRoot, useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {useAppStore} from "@/store/index.js";


function App() {

    const {userInfo, setUserInfo} = useAppStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {

            try {
                const response = await axios.get('http://localhost:6005/login/sucess', {withCredentials: true});
                console.log("response", response);
                if (response.status === 200) {
                    setUserInfo(response.data.user);
                } else {
                    setUserInfo(undefined);
                }
            } catch (err) {
                setUserInfo(undefined);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        if (!userInfo) {

            getUserData();
        } else {
            setLoading(false);
        }
    }, [userInfo, setUserInfo]);

    if (loading) {
        return <div>Loading.....</div>;
    }


    return (
        <RecoilRoot>

            <BrowserRouter>


                <Routes>
                    <Route path="/login" element={


                        <Auth/>


                    }/>
                    {/*<Route path="*" element={<Auth/>}/>*/}
                    <Route path={"/profile"} element={

                        <Profile/>


                    }/>
                    <Route path={"/Chat"} element={

                        <Chat/>


                    }/>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    )
}


export default App
