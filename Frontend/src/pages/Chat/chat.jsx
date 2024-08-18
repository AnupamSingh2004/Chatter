import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@/components/ui/button.jsx";

const Chat = () => {
    const [userdata, setUserdata] = useState({});
    console.log(userdata);

    const getUserData = async () => {
        try {
            const response = await axios.get('http://localhost:6005/login/sucess', {withCredentials: true});
            console.log("response", response);
            setUserdata(response.data.user);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getUserData();
    }, []);
    return (
        <>
            {Object.keys(userdata).length > 0 ? (
                <div>Chat</div>

            ) : <Button>login</Button>

            }
        </>
    )
}
export default Chat
