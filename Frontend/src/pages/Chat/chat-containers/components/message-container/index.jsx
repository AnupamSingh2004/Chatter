import {useAppStore} from "@/store/index.js";

export const MessageContainer = () => {
    const scrollRef = useRef();
    const {selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages} = useAppStore();

    useEffect(() => {
        const getMessages = async () => {
            try {
                // console.log(userId);
                // console.log(selectedChatData._id)


                const response = await axios.post('http://localhost:6005/getMessages', {
                    user1: userInfo._id,
                    user2: selectedChatData._id
                }, {withCredentials: true});
                if (response.data.messages) {
                    setSelectedChatMessages(response.data.messages);
                }
            } catch (e) {
                console.log({e});
            }
        }

        if (selectedChatData._id) {
            if (selectedChatType === "contact") getMessages();
        }
    }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [selectedChatMessages]);


    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages.map((message, index) => {
            const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            return (
                <div key={index}>
                    {showDate && (<div className={"text-center text-gray-500 my-2"}>
                        {moment(message.timestamp).format("LL")}
                    </div>)}
                    {
                        selectedChatType === "contact" && renderDmMessages(message)
                    }
                </div>
            )
        })
    }

    const renderDmMessages = (message) => (
        <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
            {message.messageType === "text" && (
                <div
                    className={`${message.sender !== selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                    {message.content}
                </div>
            )}
            <div className="text-xs text-gray-600">
                {moment(message.timestamp).format("LT")}
            </div>
        </div>
    )
    return (
        <div
            className={"flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full"}>
            {renderMessages()}
            <div ref={scrollRef}/>
        </div>
    )
}
import {useEffect, useRef} from "react";

import moment from "moment";
import axios from "axios";
