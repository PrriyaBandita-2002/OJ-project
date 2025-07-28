import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
  try {
      const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(res.data.user);
    setFormData({
      username: res.data.user.username,
      email: res.data.user.email,
    });
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  } finally {
    setLoading(false);
  }
};


    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
    const res = await axios.put(`${BASE_URL}/api/auth/profile/edit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      setUser(res.data.updatedUser);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile.");
    }
  };

  // Handle profile delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/auth/profile`, {
        withCredentials: true,
      });
      localStorage.clear();
      alert("Account deleted. Redirecting to login...");
      window.location.href = "/login";
    } catch (err) {
      console.error("Failed to delete profile:", err);
      alert("Error deleting account.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-red-500">Failed to load user details.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h1 className="mb-4 text-2xl font-bold text-center text-indigo-700">User Profile</h1>

        {editing ? (
          <>
            <div className="space-y-4">
              <InputField
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <InputField
                label="Email"
                value={formData.email}
                type="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <ProfileItem label="Name" value={user.username || user.name || '—'} />
              <ProfileItem label="Email" value={user.email} />
              <ProfileItem label="Role" value={user.role || 'user'} />
              <ProfileItem label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
            </div>

            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Component to show profile info
function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between pb-2 text-sm text-gray-700 border-b">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

// Component for input field
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
      />
    </div>
  );
}
