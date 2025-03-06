import React from 'react'

const ProfileData = ({previewImage,user,editMode,setEditMode,handleSubmit,userData,handleChange,handleImageChange}) => {
  return (
    <>


    <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg border border-yellow-500">
    <div className="flex flex-col items-center">
      <img
        src={previewImage}
        alt="Profile"
        className="w-24 h-24 rounded-full border border-yellow-500"
      />
      <h2 className="text-2xl font-bold text-black mt-2">{user?.name}</h2>
      <p className="text-gray-600">{user?.email}</p>
    </div>

    <div className="mt-4">
      <h3 className="text-lg font-semibold text-yellow-500">Contact Information</h3>
      {!editMode ? (
        <>
          <p><strong>Phone:</strong> {user?.phone}</p>
          <p><strong>Address:</strong> {user?.address}</p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 w-full"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Address"
          />

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 w-full"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
 
    </>
  )
}

export default ProfileData