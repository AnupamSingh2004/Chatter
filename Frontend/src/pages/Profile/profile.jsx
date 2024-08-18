import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";
import {IoArrowBack} from "react-icons/io5";


const Profile = () => {


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
        </div>
    </div>


}
export default Profile
