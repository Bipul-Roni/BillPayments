import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) return <p className="text-center mt-10">Please login to see your profile.</p>;

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    try {
      await updateUser(newName, newPhoto);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow flex flex-col items-center space-y-6">
      <img
        src={user.photoURL || "/default-avatar.png"}
        alt={user.displayName || "User"}
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
      />
      <h2 className="text-2xl font-bold">{user.displayName || "No Name"}</h2>
      <p className="text-gray-600">{user.email}</p>

      <div className="w-full space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Change Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter new name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Change Photo URL</label>
          <input
            type="text"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter new photo URL"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>

      {message && <p className="text-center text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default Profile;
