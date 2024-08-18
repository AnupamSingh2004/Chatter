import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from "@/pages/Auth/auth.jsx";
import Profile from "@/pages/Profile/profile.jsx";
import Chat from "@/pages/Chat/chat.jsx";
import {useEffect} from "react";
import axios from "axios";
import {RecoilRoot, useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";


function App() {

    const setUserData = useSetRecoilState(userState);
    const userdata = useRecoilState(userState);
    useEffect(() => {

        const getUserData = async () => {
            try {
                const response = await axios.get('http://localhost:6005/login/sucess', {withCredentials: true});
                if (response.status === 200 && response.data.id) {
                    setUserData(response.data.user);
                } else {
                    setUserData(null);
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setUserData(null);
            }
        };
        if (!userdata) {
            getUserData();
        }

    }, [userdata, setUserData]);


    return (
        <RecoilRoot>
            <div>
                <BrowserRouter>

                    <InitUser/>
                    <Routes>
                        <Route path="/auth" element={

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
            </div>
        </RecoilRoot>
    )
}

function InitUser() {


    const setUserData = useSetRecoilState(userState);


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
}

export default App
