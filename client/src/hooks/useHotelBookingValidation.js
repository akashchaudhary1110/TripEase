
import { useState, useEffect } from "react";

const useHotelBookingValidation = (dates, personsCount, personsDetail, Index) => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors(
      personsDetail.map(() => ({
        name: "",
        phone: "",
        aadhar: "",
        gender: "",
      }))
    );
  }, [personsDetail.length, personsDetail]);

  const validateForm = (index = null) => {
    const newErrors = [...errors];

    const isValidNumber = (value, length) => {
      return new RegExp(`^\\d{${length}}$`).test(value); 
    };

    if (index === null) {
      personsDetail.forEach((person, i) => {
        if (!newErrors[i]) {
          newErrors[i] = { name: "", phone: "", aadhar: "", gender: "" };
        }

        if (!person?.name) {
          newErrors[i].name = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(person?.name)) {
          newErrors[i].name = "Name must contain only letters";
        } else {
          newErrors[i].name = "";
        }

        if (!person?.gender) {
          newErrors[i].gender = "Gender is required";
        } else {
          newErrors[i].gender = "";
        }

        if (!person?.aadhar) {
          newErrors[i].aadhar = "Aadhar is required";
        } else if (!isValidNumber(person?.aadhar, 12)) {
          newErrors[i].aadhar = "Aadhar must be exactly 12 digits and contain only numbers";
        } else {
          newErrors[i].aadhar = "";
        }

        if (!person?.phone) {
          newErrors[i].phone = "Phone is required";
        } else if (!isValidNumber(person?.phone, 10)) {
          newErrors[i].phone = "Phone must be exactly 10 digits and contain only numbers";
        } else {
          newErrors[i].phone = "";
        }
      });
    } else {
      if (!newErrors[index]) {
        newErrors[index] = { name: "", phone: "", aadhar: "", gender: "" };
      }

      if (!personsDetail[index]?.name) {
        newErrors[index].name = "Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(personsDetail[index]?.name)) {
        newErrors[index].name = "Name must contain only letters";
      } else {
        newErrors[index].name = "";
      }

      if (!personsDetail[index]?.gender) {
        newErrors[index].gender = "Gender is required";
      } else {
        newErrors[index].gender = "";
      }

      if (!personsDetail[index]?.aadhar) {
        newErrors[index].aadhar = "Aadhar is required";
      } else if (!isValidNumber(personsDetail[index]?.aadhar, 12)) {
        newErrors[index].aadhar = "Aadhar must be exactly 12 digits and contain only numbers";
      } else {
        newErrors[index].aadhar = "";
      }

      if (!personsDetail[index]?.phone) {
        newErrors[index].phone = "Phone is required";
      } else if (!isValidNumber(personsDetail[index]?.phone, 10)) {
        newErrors[index].phone = "Phone must be exactly 10 digits and contain only numbers";
      } else {
        newErrors[index].phone = "";
      }
    }

    setErrors(newErrors);
    return newErrors.every((error) => !Object.values(error).some((e) => e));
  };

  return { errors, validateForm };
};

export default useHotelBookingValidation;

