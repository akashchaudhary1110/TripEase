import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const HotelBooking = () => {
    const { hotelName } = useParams();
    const [dates, setDates] = useState({ from: "", to: "" });
    const [nights, setNights] = useState(0);
    const [persons, setPersons] = useState(1);
    const [personsCount, setPersonsCount] = useState(1);
    const [personDetails, setPersonDetails] = useState([]);
    const [errors, setErrors] = useState({});

    const calculateDuration = () => {
        if (dates.from && dates.to) {
            const fromDate = new Date(dates.from);
            const toDate = new Date(dates.to);
            if (fromDate > toDate) {
                toast.error("End date must be after start date");
                return;
            }
            const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24);
            setNights(diff);
        }
    };

    const handlePersonCountChange = (e) => {
        const count = parseInt(e.target.value, 10) || 0;
setPersonsCount(count);
        setPersons(count);
        if (count > 0) {
            setPersonDetails(Array(count).fill({ name: "", gender: "", aadhar: "", phone: "" }));
        } else {
            setPersonDetails([]);
        }
    };

    const handlePersonDetailChange = (index, field, value) => {
        const updatedDetails = [...personDetails];
        updatedDetails[index][field] = value;
        setPersonDetails(updatedDetails);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!dates.from) newErrors.from = "Start date is required";
        if (!dates.to) newErrors.to = "End date is required";
        if (persons < 1) newErrors.persons = "Please select the number of persons";
        personDetails.forEach((person, index) => {
            if (!person.name) newErrors[`name${index}`] = "Name is required";
            if (!person.gender) newErrors[`gender${index}`] = "Gender is required";
            if (!person.aadhar) newErrors[`aadhar${index}`] = "Aadhar is required";
            if (!person.phone) newErrors[`phone${index}`] = "Phone is required";
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBooking = async () => {
        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/bookHotel", {
                hotelName,
                startingTime: dates.from,
                endTime: dates.to,
                amountPaid: nights * 1000,
                userID: ["userId_here"],
                 personCount: personsCount,
            });
            toast.success("Hotel booked successfully!");
        } catch (error) {
            toast.error("Booking failed. Try again.");
        }
    };

    return (
        <div className="p-6 border rounded shadow-lg max-w-lg mx-auto bg-white text-black">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">Book {hotelName}</h2>
            <label className="block font-semibold">Duration From:</label>
            <input type="date" min={new Date().toISOString().split("T")[0]} value={dates.from} onChange={(e) => setDates({ ...dates, from: e.target.value })} onBlur={calculateDuration} className="border p-2 w-full rounded" />
            {errors.from && <p className="text-red-500">{errors.from}</p>}

            <label className="block font-semibold mt-2">Duration To:</label>
            <input type="date" min={dates.from || new Date().toISOString().split("T")[0]} value={dates.to} onChange={(e) => setDates({ ...dates, to: e.target.value })} onBlur={calculateDuration} className="border p-2 w-full rounded" />
            {errors.to && <p className="text-red-500">{errors.to}</p>}

            <p className="mt-2 font-semibold text-yellow-500">{nights} Nights</p>

            <label className="block font-semibold mt-2">Number of Persons:</label>
            <input type="number" min="1" value={persons} onChange={handlePersonCountChange} className="border p-2 w-full rounded" />
            {errors.persons && <p className="text-red-500">{errors.persons}</p>}

            {personDetails.map((person, index) => (
                <div key={index} className="border p-4 mt-2 bg-yellow-100 rounded">
                    <h3 className="font-bold text-yellow-600">Person {index + 1}</h3>
                    <input type="text" placeholder="Name" value={person.name} onChange={(e) => handlePersonDetailChange(index, "name", e.target.value)} className="border p-2 w-full rounded" />
                    {errors[`name${index}`] && <p className="text-red-500">{errors[`name${index}`]}</p>}
                    <input type="text" placeholder="Gender" value={person.gender} onChange={(e) => handlePersonDetailChange(index, "gender", e.target.value)} className="border p-2 w-full rounded" />
                    {errors[`gender${index}`] && <p className="text-red-500">{errors[`gender${index}`]}</p>}
                    <input type="text" placeholder="Aadhar No" value={person.aadhar} onChange={(e) => handlePersonDetailChange(index, "aadhar", e.target.value)} className="border p-2 w-full rounded" />
                    {errors[`aadhar${index}`] && <p className="text-red-500">{errors[`aadhar${index}`]}</p>}
                    <input type="text" placeholder="Phone No" value={person.phone} onChange={(e) => handlePersonDetailChange(index, "phone", e.target.value)} className="border p-2 w-full rounded" />
                    {errors[`phone${index}`] && <p className="text-red-500">{errors[`phone${index}`]}</p>}
                </div>
            ))}

            <button onClick={handleBooking} className="bg-yellow-500 text-black p-2 rounded mt-4 w-full font-bold hover:bg-yellow-600">Book Hotel</button>
        </div>
    );
};

export default HotelBooking;
