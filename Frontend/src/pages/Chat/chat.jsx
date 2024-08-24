import {Button} from "@/components/ui/button.jsx";
import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {useAppStore} from "@/store/index.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toast";

const Chat = () => {


    const {userInfo} = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.displayName) {
            toast("Please Login");
            navigate("/auth");
        }
    }, [userInfo, navigate]);

    return (
        <div>Chat</div>
    )
}


export default Chat
