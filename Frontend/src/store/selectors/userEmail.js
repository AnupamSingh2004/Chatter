import {selector} from "recoil";
import {userState} from "@/store/atoms/userdata.js";

export const selectUserEmail = selector({
    key: 'userEmail',
    get: ({get}) => {
        const state = get(userState);

        return state.user.email;
    }
})