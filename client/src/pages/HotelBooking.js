import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { bookHotel } from "../services/hotelBooking";
import GlobalContext from "../utils/GlobalContext";
import PersonForm from "../components/PersonForm";
import useHotelBookingValidation from "../hooks/useHotelBookingValidation";
import HotelBookingForm from "./HotelBookingForm";

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

const navigate = useNavigate();

  const { errors, validateForm } = useHotelBookingValidation(
    dates,
    personsCount,
    personsDetail,
    Index
  );

  useEffect(() => {
    console.log(
      errors,
      "errors for the checking after validatingForm function in the handlechange"
    );
  });
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
        aadhar: "",
        gender: "",
      }))
    );
  };

  const handleChange = (index, field, value, name) => {
    setIndex(index);
    setKeyword(field);
    validateForm(index);
    const updatedPersons = [...personsDetail];

    updatedPersons[index][field] = value;
    setPersonsDetail(updatedPersons);
  };

  const hasErrors = () => {
    return errors.some((errorObj) =>
      Object.values(errorObj).some((errorMsg) => errorMsg !== "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    if(!dates.from || !dates.to){
      toast.error("please select the date first both starting and ending");
      return;
    }

    if (hasErrors()) {
      console.log("Errors found! Submission failed.");
    } else {
      try {
        console.log(bookingData, "booking Data");

        await bookHotel(bookingData);
      } catch (error) {
        console.error("Booking failed:", error);
      }
      console.log("✅ No errors found. Submitting Data:", personsDetail);
      navigate(`/explore`);
      
    }
  };

  return (
    <HotelBookingForm
      calculateDuration={calculateDuration}
      dates={dates}
      errors={errors}
      handleChange={handleChange}
      handlePersonsCountChange={handlePersonsCountChange}
      handleSubmit={handleSubmit}
      hotelName={hotelName}
      nights={nights}
      personsCount={personsCount}
      personsDetail={personsDetail}
      setDates={setDates}
    />
  );
};

export default HotelBooking;
