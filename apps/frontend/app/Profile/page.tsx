"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    address: "",
    password: "",
    profileImage: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [otpModal, setOtpModal] = useState({ field: "", open: false });
  const [otp, setOtp] = useState("");

  // Fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
        setForm({
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.location,
          password: "",
          profileImage: null,
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/users/update-profile",
        {
          email: form.email,
          phone: form.phone,
          location: form.address,
          password: form.password,
        },
        { withCredentials: true }
      );
      alert("Profile updated");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const requestOtp = async (field: "email" | "phone") => {
    try {
      await axios.post(
        "http://localhost:3001/api/users/request-otp",
        {
          field,
          value: form[field],
        },
        { withCredentials: true }
      );
      setOtpModal({ field, open: true });
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/users/verify-otp",
        {
          field: otpModal.field,
          value: form[otpModal.field as "email" | "phone"],
          otp,
        },
        { withCredentials: true }
      );
      setOtpModal({ field: "", open: false });
      alert(`${otpModal.field} updated successfully`);
    } catch (err) {
      alert("OTP verification failed");
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
    if (!form.profileImage) return alert("Please select an image first.");

    const data = new FormData();
    data.append("file", form.profileImage);

    try {
      await axios.put("http://localhost:3001/api/users/upload-image", data, {
        withCredentials: true,
      });

      const updated = await axios.get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      });
      setUser(updated.data);
      setForm({ ...form, profileImage: null });
      setPreviewUrl(null);
      alert("Image uploaded");
    } catch (err) {
      alert("Image upload failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

     
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <div className="flex gap-2">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={() => requestOtp("email")}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Verify
          </button>
        </div>
      </div>

     
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Phone</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={() => requestOtp("phone")}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Verify
          </button>
        </div>
      </div>

     
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Address</label>
        <textarea
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        ></textarea>
      </div>

    
      <div className="mb-4">
        <label className="block mb-1 font-semibold">New Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

   
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Profile Image</label>
        <img
          src={
            previewUrl
              ? previewUrl
              : user?.profileImage
              ? `http://localhost:3001${user.profileImage}?t=${Date.now()}`
              : "/default.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-purple-600"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          onClick={handleImageUpload}
          className="mt-2 bg-purple-600 text-white px-4 py-1 rounded"
        >
          Upload Image
        </button>
      </div>

      <button
        onClick={handleProfileUpdate}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Changes
      </button>

    
      {otpModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Enter OTP</h3>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter OTP"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOtpModal({ field: "", open: false })}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={verifyOtp}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
