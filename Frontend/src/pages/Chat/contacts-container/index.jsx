export const ContactsContainer = () => {
    return <div
        className={"relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b]"}>
        <div className="pt-1">
            <Logo/>
        </div>

        <div className="my-5">
            <Title text={"Direct Messages"}/>
        </div>

    </div>

}


const Logo = () => {
    return (
        <div className="flex flex-row cursor-pointers ">
            <img src="../../../../public/Chatter.png" alt="Logo" className={"h-36 w-36 cursor-pointer"}/>
            <div className={"poppins-medium pt-14 text-4xl font-bold ml-[-10px] cursor-pointer"}>Chatters</div>
        </div>
    )
}

const Title = ({text}) => {
    return (
        <h6 className={"uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-md"}>{text}</h6>
    )
}
