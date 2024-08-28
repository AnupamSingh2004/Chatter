import React from 'react'

export const EmptyChatContainers = () => {
    return <div
        className={"flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all"}>
        <div
            className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl transition-all duration-300">
            <h3 className={"poppins-medium"}>
                Hi<span className={"text-orange-400"}>!</span> Welcome to
                <span className={"text-orange-400"}> Chatters</span> Chat App
                <span className={"text-orange-400"}>.</span>
            </h3>
        </div>
    </div>

}
