"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import {
  User,
  MapPin,
  Lock,
  Camera,
} from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    country: "",
    state_or_region: "",
    profileImage: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      const backendToken = (session?.user as any)?.backendToken;

      if (!backendToken) return;

      setToken(backendToken);

      try {
        const res = await axios.get("http://localhost:3001/api/users/me", {
          headers: { Authorization: `Bearer ${backendToken}` },
          withCredentials: true,
        });

        const u = res.data;
        setUser(u);
        setForm({
          email: u.email,
          phone: u.phone || "",
          location: u.location || "",
          password: "",
          confirmPassword: "",
          name: u.name || "",
          age: u.age?.toString() || "",
          country: u.country || "",
          state_or_region: u.state_or_region || "",
          profileImage: null,
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const handleProfileUpdate = async () => {
    if (!token) return;

    if (form.password && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3001/api/users/update-profile",
        {
          email: form.email,
          phone: form.phone,
          location: form.location,
          password: form.password,
          name: form.name,
          age: parseInt(form.age) || null,
          country: form.country,
          state_or_region: form.state_or_region,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      const updated = await axios.get("http://localhost:3001/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUser(updated.data);
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setForm({ ...form, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!form.profileImage || !token) return alert("Select an image first.");

    const data = new FormData();
    data.append("file", form.profileImage);

    try {
      await axios.put("http://localhost:3001/api/users/upload-image", data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const updated = await axios.get("http://localhost:3001/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUser(updated.data);
      setForm({ ...form, profileImage: null });
      setPreviewUrl(null);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    }
  };

  return (
    <div className="p-4">
      {/* Profile image */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={
              previewUrl
                ? previewUrl
                : user?.profileImage
                ? `http://localhost:3001${user.profileImage}?t=${Date.now()}`
                : "https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png"
            }
            className="w-32 h-32 rounded-full object-cover border"
            alt="Profile"
          />
          <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
            <Camera className="w-5 h-5 text-blue-600" />
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
        <button onClick={handleImageUpload} className="btn btn-sm btn-primary">
          Upload Image
        </button>
      </div>

      {/* Form fields */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          placeholder="Age"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          placeholder="Country"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={form.state_or_region}
          onChange={(e) => setForm({ ...form, state_or_region: e.target.value })}
          placeholder="State or Region"
          className="border px-3 py-2 rounded"
        />
        <textarea
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="Address"
          className="border px-3 py-2 rounded col-span-full"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="New Password"
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          placeholder="Confirm Password"
          className="border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow">
          Profile updated successfully!
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
