import { axiosInstance } from "../api/axiosInstance"
import { auth } from "../api/url"




export const signInService = async(email, password) => {
     try {
        const response = await axiosInstance.post(auth.login, {email, password});

        return response.data
        
     } catch (error) {
        throw error
     }
}