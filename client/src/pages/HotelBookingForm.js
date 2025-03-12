import React from "react";
import PersonForm from "../components/PersonForm";

const HotelBookingForm = ({
  hotelName,
  dates,
  setDates,
  calculateDuration,
  errors,
  personsCount,
  handlePersonsCountChange,
  handleSubmit,
  personsDetail,
  // handleChange,
  setIndex,
  validateForm,
  setPersonsDetail,
  nights,
}) => {



  const handleChange = (index, field, value, name) => {
    setIndex(index);
    // setKeyword(field);
   
    const updatedPersons = [...personsDetail];

    updatedPersons[index][field] = value;
    setPersonsDetail(updatedPersons);
    setTimeout(()=>{
      validateForm(index);
    },2000)
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
        {personsDetail.map((person, index) => (
          <PersonForm
            key={index}
            index={index}
            errors={errors[index]}
            person={person}
            handleChange={handleChange} personsDetail={personsDetail[index]}
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

export default HotelBookingForm;
