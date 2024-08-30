import {ProfileInfo} from "@/pages/Chat/contacts-container/components/profile-info/index.jsx";
import {NewDm} from "@/pages/Chat/contacts-container/components/new-dm/index.jsx";

export const ContactsContainer = () => {
    return <div
        className={"relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b]"}>
        <div className="pt-1">
            <Logo/>
        </div>

        <div className="my-5">
            <div className="flex items-center justify-between pr-10">

                <Title text={"Direct Messages"}/>
                <NewDm/>
            </div>
        </div>
        <div className="my-5 mt-7">
            <Title text={"Groups"}/>
        </div>
        <ProfileInfo/>

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
