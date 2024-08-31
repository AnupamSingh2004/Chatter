import {Button} from "@/components/ui/button.jsx";
import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {useAppStore} from "@/store/index.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toast";
import {ContactsContainer} from "@/pages/Chat/contacts-container/index.jsx";
import {EmptyChatContainers} from "@/pages/Chat/empty-chat-containers/index.jsx";
import {ChatContainer} from "@/pages/Chat/chat-containers/index.jsx";

const Chat = () => {


    const {userInfo, selectedChatType} = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo.displayName) {
            toast("Please Login");
            navigate("/login");

        }
    }, [userInfo, navigate]);

    return (
        <div className="flex h-[100vh] text-white overflow-hidden">
            <ContactsContainer/>
            {
                selectedChatType === undefined ? <EmptyChatContainers/> : <ChatContainer/>
            }
            {/*<EmptyChatContainers/>*/}
            {/*<ChatContainer/>*/}
        </div>
    )
}


export default Chat
