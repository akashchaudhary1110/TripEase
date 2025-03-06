
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


export const fetchUserBookings = async () => {
    try {
        const response = await API.get("/api/bookings/userBookings");
        return response.data.bookings;
    } catch (error) {
        console.error("Error fetching bookings:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch bookings.");
        return [];
    }
};
