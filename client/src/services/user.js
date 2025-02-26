import API from "../utils/AxiosInterceptor";


export const fetchUser = async (userId) => {
    try {
        const response = await API.get(`/api/user/fetchUser/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
    }
};


export const updateUser = async (userId, updateData) => {
    try {
        const response = await API.put(`/api/user/updateUser/${userId}`, updateData);
        console.log("Updated User:", response.data);
    } catch (error) {
        console.error(error.response.data);
    }
};

