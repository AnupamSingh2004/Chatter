import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {IoArrowBack} from "react-icons/io5";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "@/components/ui/avatar.jsx";
import {useState} from "react";
import {getColor} from "@/lib/utils.js";


const Profile = () => {

    const [firstName, setFirstName] = useState("");
    const [image, setImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);


    function logout() {
        window.open("http://localhost:6005/logout", "_self");
    }


    // const {userInfo} = useAppStore();
    const userData = useRecoilState(userState);


    return <div className={"bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10"}>
        <div className={"flex flex-col gap-10 w-[80vw] md:w-max"}>
            <div>
                <IoArrowBack className={"text-4xl lg:text-6xl text-white/90 cursor-pointer"}/>
            </div>
            <div className={"grid grid-cols-2"}>
                <div className={"h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"}>

                    <Avatar>
                        {
                            image ? (<AvatarImage/>) : (
                                <div
                                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex justify-center items-center rounded-full`}
                                >
                                    {/*{firstName ? firstName.split("").shift() :*/}
                                    {/*    userData[0].displayName.split("").shift()}*/}
                                </div>)
                        }
                    </Avatar>
                </div>
            </div>
        </div>
    </div>


}
export default Profile
