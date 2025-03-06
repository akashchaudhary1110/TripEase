import { useState, useEffect, useContext } from "react";
import GlobalContext from "../utils/GlobalContext";
import { fetchUser, updateUser } from "../services/user";
import { toast } from "react-toastify";
import UserBookings from "../components/UserBookings";
import ProfileData from "../components/ProfileData";

const Profile = () => {
  const { state } = useContext(GlobalContext);
  const userId = state?.user?.userId;
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
    const loadUser = async () => {
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetchUser(userId);
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
      setPreviewImage(URL.createObjectURL(file));
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
    <div className="flex flex-col md:flex-row items-start max-w-6xl mx-auto mt-10 gap-6">
  
      <ProfileData editMode={editMode} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} previewImage={previewImage} setEditMode={setEditMode} user={user} userData={userData} />

  
      <div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-black mb-4">Your Bookings</h2>
        <UserBookings userId={userId} />
      </div>
    </div>
  );
};

export default Profile;
