import React from 'react'
import {RiCloseFill} from "react-icons/ri";
import {useAppStore} from "@/store/index.js";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "@/components/ui/avatar.jsx";
import {getColor} from "@/lib/utils.js";

export const ChatHeader = () => {

    const {closeChat, selectedChatData, selectedChatType} = useAppStore();
    return (
        <div className={"h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20"}>
            <div className="flex gap-5 items-center">
                <div className="flex gap-3 items-center justify-center">
                    <div className="w-12 h-12 relative">

                        <Avatar className={"h-12 w-12 rounded-full overflow-hidden "}>
                            {
                                !selectedChatData.image ? (
                                    <AvatarImage src={selectedChatData.image}
                                                 className={"object-cover w-full h-full bg-black"}
                                    />) : (
                                    <div
                                        className={`uppercase h-12 w-12  text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(selectedChatData.color)} `}
                                    >

                                        {selectedChatData.displayName ? selectedChatData.displayName.split("").shift() : selectedChatData.displayName.split("").shift()}
                                    </div>)
                            }
                        </Avatar>
                    </div>
                    <div>
                        {selectedChatType === "contact" && selectedChatData.displayName ? `${selectedChatData.displayName} ` : selectedChatData.email}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <button
                        className={"text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"}
                        onClick={closeChat}>
                        <RiCloseFill className="text-3xl"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
