import httpUtils, {handleError} from "@/core/utils/http.utils";
import {LoginFormInterface} from "@/@types/form/login";
import {UserModelInterface} from "@/@types/model/user";

class AuthService {

    /**
     *
     * @param data
     */
    static async login(data: LoginFormInterface) {
        try {
            const response = await httpUtils.post('/login', data)
            return {
                user: response?.data?.user as UserModelInterface,
                token: response?.data?.token as string
            }
        } catch (exception) {
            throw handleError(exception, true)
        }
    }

    /**
     * FETCH AUTH USER
     */
    static async fetchAuthUser() {
        try {
            const response = await httpUtils.get('/me')
            return {
                user: response?.data as UserModelInterface,
            }
        } catch (exception) {
            throw handleError(exception)
        }
    }

}

export default AuthService
