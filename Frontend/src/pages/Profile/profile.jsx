import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {IoArrowBack} from "react-icons/io5";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "@/components/ui/avatar.jsx";
import {useEffect, useState} from "react";
import {colors, getColor} from "@/lib/utils.js";
import {selectUserEmail} from "@/store/selectors/userEmail.js";
import {useAppStore} from "@/store/index.js";
import {useNavigate} from "react-router-dom";
import {FaPlus, FaTrash} from "react-icons/fa";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {toast} from "react-toast";
import axios from "axios";


const Profile = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [hovered, setHovered] = useState(false);


    const {userInfo, setUserInfo} = useAppStore();
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

    const validateProfile = () => {
        if (!firstName) {
            toast.error("Please Enter name");
            return false;
        }
        return true;
    }

    const saveChanges = async () => {
        if (validateProfile()) {
            try {
                const response = await axios.put("http://localhost:6005/changeProfile/" + userInfo._id, {
                    id: userInfo._id,
                    displayName: firstName,
                    lastName: lastName,
                    color: selectedColor,

                }, {withCredentials: true});
                if (response.status === 200) {
                    setUserInfo({
                        id: userInfo._id,
                        displayName: firstName,
                        lastName: lastName,
                        color: selectedColor,
                    });
                    toast.success("Profile saved successfully.");
                } else {
                    toast.error("Profile does not exist");
                }

                let updatedCourse = {
                    _id: userInfo._id,
                    displayName: firstName,
                    color: selectedColor,
                    image: userInfo.image,
                    email: userInfo.email,
                    profileSetup: true,
                };

                setUserInfo(updatedCourse);
            } catch (e) {
                console.log(e);
            }
        }
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
                                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex justify-center items-center rounded-full ${getColor(selectedColor)} `}
                                >

                                    {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                                </div>)
                        }
                    </Avatar>
                    {
                        hovered && (
                            <div
                                className={"absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"}>
                                {image ? <FaTrash className={"text-white text-3xl cursor-pointer"}/> :
                                    <FaPlus className={"text-white text-3xl cursor-pointer"}/>
                                }
                            </div>
                        )}
                </div>
                <div className="flex min-w-32 md:min-w-64  flex-col gap-5 text-white items-center justify-center">
                    <div className="w-full">
                        <Input
                            placeholder={"Email"}
                            type={"email"}
                            disabled
                            value={userInfo.email}
                            className={"rounded-lg p-6 bg-[#2c2e3b] border-none"}
                        />
                        <div className="w-full">

                            <Input
                                placeholder={"Full Name"}
                                type={"text"}
                                // value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={"rounded-lg p-6 bg-[#2c2e3b] border-none mt-5 mb-5 text-md"}
                            />
                        </div>

                        <div className="w-full flex gap-5">
                            {
                                colors.map((color, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div
                                        className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                                        ${selectedColor === index ? "outline outline-white/60 outline-1" : ""}`}
                                        key={index}
                                        onClick={() => setSelectedColor(index)}
                                    ></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-full"}>
                <Button className={"h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 "}
                        onClick={saveChanges}
                >
                    Save changes
                </Button>
            </div>
        </div>
    </div>


}
export default Profile
