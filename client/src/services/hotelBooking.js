
import { toast } from "react-toastify";
import API from "../utils/AxiosInterceptor";

export const bookHotel = async (bookingData) => {
    try {
        const response = await API.post("/api/bookings/create", bookingData);
        toast.success("Hotel booked successfully!");
        return response.data;
    } catch (error) {
        console.error("Booking error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Booking failed. Try again.");
        throw error;
    }
};
