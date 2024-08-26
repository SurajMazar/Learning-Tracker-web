import {useSelector} from "react-redux";
import store from "@/core/store/store";

const useStore = () => {
    return useSelector(state => state) as ReturnType<typeof store.getState>
}

export default useStore
