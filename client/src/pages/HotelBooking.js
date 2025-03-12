import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { bookHotel } from "../services/hotelBooking";
import GlobalContext from "../utils/GlobalContext";
import useHotelBookingValidation from "../hooks/useHotelBookingValidation";
import HotelBookingForm from "./HotelBookingForm";
import HotelBookingValidation from "../utils/HotelBookingValidator";

const HotelBooking = () => {
  const { hotelName } = useParams();
  const { state } = useContext(GlobalContext);
  const userId = state.user?.userId;
  const [nights, setNights] = useState(0);
  const [personsCount, setPersonsCount] = useState(0);
  const [Index, setIndex] = useState();
  // const [keyword, setKeyword] = useState();
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

  const [validator, setValidator] = useState(new HotelBookingValidation(personsDetail));

  // useEffect(() => {
  //   console.log(
  //     validator,
  //     "errors for the checking after validatingForm function in the handlechange"
  //   );
  //   // console.log(personsDetail,"checking person detail on every render")
  // });
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



  const hasErrors = () => {
    return errors.some((errorObj) =>
      Object.values(errorObj).some((errorMsg) => errorMsg !== "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    // validator.validateAll();
    // console.log(validator.errors,"errors of the all function");
    if(!dates.from || !dates.to){
      toast.error("please select the date first both starting and ending");
      return;
    }

    if (hasErrors()) {
      console.log("Errors found! Submission failed.");
      toast.error("Please fill the complete form and correctly!")
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
      // handleChange={handleChange}

      handlePersonsCountChange={handlePersonsCountChange}
      handleSubmit={handleSubmit}
      hotelName={hotelName}
      nights={nights}
      personsCount={personsCount}
      personsDetail={personsDetail}
      validator={validator}
      setValidator={setValidator}
      setDates={setDates} setIndex={setIndex} setPersonsDetail={setPersonsDetail} validateForm={validateForm} 
    />
  );
};

export default HotelBooking;
