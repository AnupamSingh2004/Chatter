import {CgGoogle} from "react-icons/cg";
import {GrGoogle} from "react-icons/gr";

const Auth = () => {

    const loginWithGoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self");
    }
    return <>
        <div className={" bg-[#1b1c24] h-[100vh] w-[100vw] flex justify-center items-center flex-col "}>
            <h4 className={"font-bold text-6xl flex pb-52 text-white"}>Chatters</h4>
            <button
                className={"bg-blue-950 p-5 text-white rounded-xl w-[60vw] hover:bg-blue-900 flex items-center justify-center"}
                onClick={loginWithGoogle}>
                Sign in with Google <GrGoogle className={"text-white flex text-2xl ml-2"}/>
            </button>
        </div>
    </>
}


export default Auth;