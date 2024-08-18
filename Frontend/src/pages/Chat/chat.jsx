import {Button} from "@/components/ui/button.jsx";
import {useRecoilState} from "recoil";
import {userState} from "@/store/atoms/userdata.js";

const Chat = () => {

    function logout() {
        window.open("http://localhost:6005/logout", "_self");
        userData(null);
    }


    const userData = useRecoilState(userState);

    return (
        <>
            {userData[0].displayName ? (
                <div>Chat
                    <div>{userData[0].image}</div>
                    <button onClick={logout}>
                        Logout
                    </button>
                </div>

            ) : <Button>login</Button>

            }
        </>
    )
}


export default Chat
