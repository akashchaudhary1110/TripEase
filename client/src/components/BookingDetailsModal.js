import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null; 

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()} 
        className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 left-2 text-gray-600 hover:text-red-500">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-yellow-500 text-center">Booking Details</h2>
        
        <div className="mt-4 text-black space-y-2">
          <p><strong>Hotel:</strong> {booking.hotelName || "Not Available"}</p>
          <p><strong>Duration:</strong> {booking.startingTime ? `${booking.startingTime} to ${booking.endTime}` : "Not Available"}</p>
          <p><strong>Amount Paid:</strong> {booking.amountPaid ? `₹${booking.amountPaid}` : "Not Available"}</p>
          <p><strong>Persons Count:</strong> {booking.personCount || "Not Available"}</p>
          
        
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Persons Details:</h3>
            
            {booking.hasOwnProperty("personsDetail") ? (
              Array.isArray(booking.personsDetail) && booking.personsDetail.length > 0 ? (
                booking.personsDetail.map((person, index) => (
                  <div key={person._id || index} className="p-3 border rounded-lg bg-gray-100 my-2">
                    <p><strong>Name:</strong> {person.name || "Not Available"}</p>
                    <p><strong>Gender:</strong> {person.gender || "Not Available"}</p>
                    <p><strong>Phone:</strong> {person.phone || "Not Available"}</p>
                    <p><strong>Aadhar:</strong> {person.aadhar || "Not Available"}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Persons Detail Not Available</p>
              )
            ) : (
              <p className="text-gray-500">Persons Detail Field Missing</p> 
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingDetailsModal;
