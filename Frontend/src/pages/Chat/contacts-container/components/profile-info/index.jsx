import React from 'react'
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "@/components/ui/avatar.jsx";
import {getColor} from "@/lib/utils.js";
import {useAppStore} from "@/store/index.js";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {FiEdit2} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {IoPowerSharp} from "react-icons/io5";

export const ProfileInfo = () => {
    const {userInfo} = useAppStore();
    const navigate = useNavigate();

    function logout() {
        window.open("http://localhost:6005/logout", "_self");
        navigate("/login");
    }

    return (
        <div
            className={"absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]"}>
            <div className="flex gap-3 items-center justify-center">
                <div className="w-12 h-12 relative">

                    <Avatar className={"h-12 w-12 rounded-full overflow-hidden "}>
                        {
                            !userInfo.image ? (
                                <AvatarImage src={userInfo.image} className={"object-cover w-full h-full bg-black"}
                                />) : (
                                <div
                                    className={`uppercase h-12 w-12  text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(userInfo.color)} `}
                                >

                                    {userInfo.displayName ? userInfo.displayName.split("").shift() : userInfo.displayName.split("").shift()}
                                </div>)
                        }
                    </Avatar>
                </div>
                <div>
                    {userInfo.displayName ? `${userInfo.displayName}` : ``}
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className={"text-purple-500 hover:text-purple-700 text-xl font-medium"}
                                     onClick={() => navigate("/profile")}
                            />
                        </TooltipTrigger>
                        <TooltipContent className={"bg-[#1c1b1e] border-none text-white"}>
                            Edit Profile
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp className={"text-red-400 hover:text-red-500 text-xl font-medium"}
                                          onClick={logout}
                            />
                        </TooltipTrigger>
                        <TooltipContent className={"bg-[#1c1b1e] border-none text-white"}>
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
