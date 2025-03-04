const PersonForm = ({ index, person, handleChange, errors }) => {
    return (
      <div className="border p-6 mt-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-yellow-600 mb-3">Person {index + 1}</h3>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={person.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            className="border p-2 w-full rounded focus:ring focus:ring-yellow-300"
          />
          {errors?.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={person.phone}
            onChange={(e) => handleChange(index, "phone", e.target.value)}
            className="border p-2 w-full rounded focus:ring focus:ring-yellow-300"
          />
          {errors?.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            placeholder="Enter Aadhar number"
            value={person.aadhar}
            onChange={(e) => handleChange(index, "aadhar", e.target.value)}
            className="border p-2 w-full rounded focus:ring focus:ring-yellow-300"
          />
          {errors?.aadhar && <p className="text-red-600 text-sm mt-1">{errors.aadhar}</p>}
        </div>
        <div className="mb-2">
          <label className="block font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={person.gender}
            onChange={(e) => handleChange(index, "gender", e.target.value)}
            className="border p-2 w-full rounded focus:ring focus:ring-yellow-300"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors?.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>
    );
  };
  
  export default PersonForm;
  