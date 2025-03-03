import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { bookHotel } from "../services/hotelBooking";
import GlobalContext from "../utils/GlobalContext";
import PersonForm from "../components/PersonForm";
import useHotelBookingValidation from "../hooks/useHotelBookingValidation";

const HotelBooking = () => {
  const { hotelName } = useParams();
  const { state } = useContext(GlobalContext);
  const userId = state.user?.userId;
  const [nights, setNights] = useState(0);
  const [personsCount, setPersonsCount] = useState(0);
  const [Index, setIndex] = useState();
  const [keyword, setKeyword] = useState();
  const [dates, setDates] = useState({ from: "", to: "" });
  const [personsDetail, setPersonsDetail] = useState([
    { name: "", phone: "", adhaar: "", gender: "" },
  ]);
const { errors, validateForm } = useHotelBookingValidation(dates, personsCount, personsDetail,Index);

useEffect(()=>{
    console.log(errors,"errors for the checking after validatingForm function in the handlechange");
    
})
  const bookingData = {
    hotelName,
    startingTime: dates.from,
    endTime: dates.to,
    amountPaid: nights * 1000,
    userID: userId,
    personCount: personsCount,
    personsDetail: personsDetail,
  };

  const calculateDuration = () => {
    if (dates.from && dates.to) {
      const fromDate = new Date(dates.from);
      const toDate = new Date(dates.to);
      const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24);
      setNights(diff);
    }
  };

  const handlePersonsCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setPersonsCount(count);
    setPersonsDetail(
      Array.from({ length: count }, (_, index) => ({
        name: "",
        phone: "",
        adhaar: "",
        gender: "",
      }))
    );
  };

  //   const handlePersonDetailChange = (index, field, value) => {
  //     const updatedDetails = [...personDetails];
  //     updatedDetails[index][field] = value;
  //     setPersonDetails(updatedDetails);
  //   };

  //   const validateForm = () => {
  //     const newErrors = {};
  //     if (!dates.from) newErrors.from = "Start date is required";
  //     if (!dates.to) newErrors.to = "End date is required";
  //     if (persons < 1) newErrors.persons = "Please select the number of persons";
  //     personDetails.forEach((person, index) => {
  //       if (!person.name) newErrors[`name${index}`] = "Name is required";
  //       if (!person.gender) newErrors[`gender${index}`] = "Gender is required";
  //       if (!person.aadhar) newErrors[`aadhar${index}`] = "Aadhar is required";
  //       if (!person.phone) newErrors[`phone${index}`] = "Phone is required";
  //     });
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  const handleBooking = async () => {
    // if (!validateForm()) {
    //   toast.error("Please fill all required fields");
    //   return;
    // }
    // try {
    //   await bookHotel(bookingData);
    // } catch (error) {
    //   console.error("Booking failed:", error);
    // }
  };

  const handleChange = (index, field, value,name) => {
    setIndex(index);
    setKeyword(field);
    validateForm(index);
    const updatedPersons = [...personsDetail];

    
    updatedPersons[index][field] = value;
    setPersonsDetail(updatedPersons);
  };

// Function to check if errors exist
const hasErrors = () => {
    return errors.some((errorObj) =>
      Object.values(errorObj).some((errorMsg) => errorMsg !== "")
    );
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm(); // Run validation before checking errors
  
    if (hasErrors()) {
      console.log("Errors found! Submission failed.");
    } else {
          try {
            console.log(bookingData,"booking Data");
            
      await bookHotel(bookingData);
    } catch (error) {
      console.error("Booking failed:", error);
    }
      console.log("✅ No errors found. Submitting Data:", personsDetail);
    }
  };
  

  return (
    <div className="p-6 border rounded shadow-lg max-w-lg mx-auto bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">
        Book {hotelName}
      </h2>
      <label className="block font-semibold">Duration From:</label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={dates.from}
        onChange={(e) => setDates({ ...dates, from: e.target.value })}
        onBlur={calculateDuration}
        className="border p-2 w-full rounded"
      />
      {errors.from && <p className="text-red-500">{errors.from}</p>}

      <label className="block font-semibold mt-2">Duration To:</label>
      <input
        type="date"
        min={dates.from || new Date().toISOString().split("T")[0]}
        value={dates.to}
        onChange={(e) => setDates({ ...dates, to: e.target.value })}
        onBlur={calculateDuration}
        className="border p-2 w-full rounded"
      />
      {errors.to && <p className="text-red-500">{errors.to}</p>}

      <p className="mt-2 font-semibold text-yellow-500">{nights} Nights</p>
      <label className="block font-semibold">Number of Persons:</label>
      <input
        type="number"
        min="1"
        max="10"
        value={personsCount}
        onChange={handlePersonsCountChange}
        className="border p-2 w-full rounded"
      />
      {errors.persons && <p className="text-red-500">{errors.persons}</p>}

      <form onSubmit={handleSubmit}>
        {/* Dynamically render forms based on personsCount */}
        {personsDetail.map((person, index) => (
          <PersonForm
            key={index}
            index={index}
            errors = {errors[index]}
            person={person}
            handleChange={handleChange}
          />
        ))}

        <button
          type="submit"
          className="bg-yellow-500 text-black p-2 rounded mt-4 w-full font-bold hover:bg-yellow-600"
        >
          Submit
        </button>
      </form>

        </div>
  );
};

export default HotelBooking;
