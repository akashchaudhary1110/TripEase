import { useState, useEffect, useContext } from "react";
import GlobalContext from "../utils/GlobalContext";
import { fetchUser, updateUser } from "../services/user";
import { toast } from "react-toastify";

const Profile = () => {
  const { state } = useContext(GlobalContext);
  const userId = state?.user?.userId; // Get user ID from context

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("/default-avatar.png");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: "",
  });

  useEffect(() => {
    console.log(state.user.userId, "user in the profile");
  });

  // Fetch user details from backend
  useEffect(() => {
    console.log(userId, "userID");

    const loadUser = async () => {
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetchUser(userId);
        console.log(response, "response");
        if (response) {
          setUser(response);
          setUserData({
            name: response.name || "",
            email: response.email || "",
            phone: response.phone || "",
            address: response.address || "",
            profilePic: response.profilePic || "",
          });
          setPreviewImage(response.profilePic || "/default-avatar.png");
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview before uploading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = userData.profilePic;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        // Upload image to backend
        const res = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.imageUrl) {
          imageUrl = data.imageUrl;
        }
      }

      const updatedData = { ...userData, profilePic: imageUrl };
      await updateUser(userId, updatedData);
      setUser(updatedData);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg border border-yellow-500">
      <div className="flex items-center space-x-4">
        <img
          src={previewImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border border-yellow-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-black">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-yellow-500">
          Contact Information
        </h3>
        {!editMode ? (
          <>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p>
              <strong>Address:</strong> {user?.address}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
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
              <label className="block font-semibold text-gray-700">
                Profile Picture
              </label>
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
                className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
