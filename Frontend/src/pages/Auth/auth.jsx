import {CgGoogle} from "react-icons/cg";
import {GrGoogle} from "react-icons/gr";

const Auth = () => {

    const loginWithGoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self");
    }
    return <>
        <div className={" bg-[#1b1c24] h-[100vh] w-[100vw] flex justify-center items-center flex-col "}>
            <div className="p-16">

                <Logo/>
            </div>
            <button
                className={"bg-blue-950 p-5 text-white rounded-xl w-[60vw] hover:bg-blue-900 flex items-center justify-center"}
                onClick={loginWithGoogle}>
                Sign in with Google <GrGoogle className={"text-white flex text-2xl ml-2"}/>
            </button>
        </div>
    </>
}

const Logo = () => {
    return (
        <div className="flex flex-row cursor-pointers ">
            <img src="../../../../public/Chatter.png" alt="Logo" className={"h-56 w-56 cursor-pointer"}/>
            <div className={"poppins-medium pt-14 text-8xl font-bold ml-[-10px] cursor-pointer text-white"}>Chatters
            </div>
        </div>
    )
}

export default Auth;