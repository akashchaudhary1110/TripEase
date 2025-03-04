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
        } else if (!/^\d{12}$/.test(person?.aadhar)) {
          newErrors[i].aadhar = "Aadhar must be 12 digits";
        } else {
          newErrors[i].aadhar = "";
        }
  
        if (!person?.phone) {
          newErrors[i].phone = "Phone is required";
        } else if (!/^\d{10}$/.test(person?.phone)) {
          newErrors[i].phone = "Phone must be 10 digits";
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
      } else if (!/^\d{12}$/.test(personsDetail[index]?.aadhar)) {
        newErrors[index].aadhar = "Aadhar must be 12 digits";
      } else {
        newErrors[index].aadhar = "";
      }
  
      if (!personsDetail[index]?.phone) {
        newErrors[index].phone = "Phone is required";
      } else if (!/^\d{10}$/.test(personsDetail[index]?.phone)) {
        newErrors[index].phone = "Phone must be 10 digits";
      } else {
        newErrors[index].phone = "";
      }
    }
  
    setErrors(newErrors);
  
    // Returns true if no errors exist
    return newErrors.every((error) => !Object.values(error).some((e) => e));
  };
  
  

  return { errors, validateForm };
};

export default useHotelBookingValidation;
