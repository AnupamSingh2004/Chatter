import {useEffect, useState} from "react";
import axios from "axios";

const Profile = () => {
    const [userdata, setUserdata] = useState({});
    console.log(userdata);

    const getUserData = async () => {
        try {
            const response = await axios.get('http://localhost:6005/login/sucess', {withCredentials: true});
            console.log("response",response);
            setUserdata(response.data.user);
        }catch (err){
            console.log(err);
        }
    }

    const logout = () =>{
        window.open("http://localhost:6005/logout","_self");
    }

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <>
            {Object.keys(userdata).length > 0 ? (
                <div>
                    <div className={"font-bold text-3xl"}>{userdata?.displayName}</div>
                    <div className={"p-5"}>
                        <img className={"rounded-full"} src={userdata.image} alt="profile photo" />
                    </div>
                    <button className={"p-5 bg-blue-950 text-white rounded-xl"} onClick={logout}>logout</button>
                </div>

            ): <div>
                <button className={"p-5 bg-blue-950 text-white rounded-xl"}>Login</button>
            </div>

             }
        </>
    )
}
export default Profile
