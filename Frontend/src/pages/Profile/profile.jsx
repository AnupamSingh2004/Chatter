import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {IoArrowBack} from "react-icons/io5";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "@/components/ui/avatar.jsx";
import {useEffect, useState} from "react";
import {getColor} from "@/lib/utils.js";
import {selectUserEmail} from "@/store/selectors/userEmail.js";
import {useAppStore} from "@/store/index.js";
import {useNavigate} from "react-router-dom";
import {FaPlus, FaTrash} from "react-icons/fa";


const Profile = () => {

    const navigate = useNavigate();


    const [firstName, setFirstName] = useState("");
    const [image, setImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [hovered, setHovered] = useState(false);

    const {userInfo} = useAppStore();
    console.log(userInfo);

    useEffect(() => {
        if (userInfo.displayName) {
            setFirstName(userInfo.displayName);
            setSelectedColor(userInfo.color);
        }
    }, [userInfo]);

    function logout() {
        window.open("http://localhost:6005/logout", "_self");
        navigate("/auth");
    }


    // const {userInfo} = useAppStore();
    // const userData = useRecoilState(userState);


    // const userEmail = useRecoilState(selectUserEmail);
    // console.log(userEmail);


    return <div className={"bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10"}>
        <div className={"flex flex-col gap-10 w-[80vw] md:w-max"}>
            <div>
                <IoArrowBack className={"text-4xl lg:text-6xl text-white/90 cursor-pointer"}/>
            </div>
            <div className={"grid grid-cols-2"}>
                <div className={"h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"}
                     onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}
                >

                    <Avatar>
                        {
                            image ? (<AvatarImage src={image} className={"object-cover w-full h-full bg-black"}
                            />) : (
                                <div
                                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex justify-center items-center rounded-full ${getColor(setSelectedColor)} `}
                                >

                                    {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                                </div>)
                        }
                    </Avatar>
                    {
                        hovered &&
                        <div
                            className={"absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"}>
                            {image ? <FaTrash className={"text-white text-3xl cursor-pointer"}/> :
                                <FaPlus className={"text-white text-3xl cursor-pointer"}/>}
                        </div>
                    }

                </div>
            </div>
        </div>
    </div>


}
export default Profile
