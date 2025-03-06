import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { FaHotel } from "react-icons/fa"; // Importing FontAwesome hotel icon
import { fetchUserBookings } from "../services/hotelBooking";

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      if (!userId) return;
      setLoading(true);
      const data = await fetchUserBookings();
      setBookings(data);
      setLoading(false);
    };

    getBookings();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-600">Loading bookings...</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-yellow-500">Hotel Bookings</h3>
      {bookings.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 space-y-4"
        >
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-black">
                <strong>Hotel:</strong> {booking.hotelName}
              </p>
              <p className="text-gray-600">
                <strong>Duration:</strong> {booking.startingTime} to {booking.endTime}
              </p>
              <p className="text-black">
                <strong>Amount Paid:</strong> ₹{booking.amountPaid}
              </p>
              <p className="text-black">
                <strong>Persons:</strong> {booking.personCount}
              </p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mt-4 text-gray-500"
        >
          <FaHotel className="text-6xl opacity-70" /> {/* FontAwesome Hotel Icon */}
          <p className="mt-2">No bookings till now.</p>
        </motion.div>
      )}
    </div>
  );
};

export default UserBookings;
