"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button/page";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");
  const [isAgreed, setIsAgreed] = useState(false);

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const { setUser } = useAuth();

  const handleTabChange = (tab: "signIn" | "signUp") => {
    setMessage(null);
    setMessageType(null);
    setActiveTab(tab);
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/login",
        signInData,
        {
          withCredentials: true,
        }
      );
      setMessage(`Welcome, ${res.data.name}`);
      setMessageType("success");
      setUser({
        user_id: res.data.user_id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        profileImage: res.data.profileImage || null,
      });

      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } catch {
      setMessage("Login failed. Please check your credentials.");
      setMessageType("error");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/register", signUpData, {
        withCredentials: true,
      });
      setMessage(`Welcome, ${signUpData.name}!`);
      setMessageType("success");
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } catch {
      setMessage("Registration failed. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activeTab === "signIn" ? "Sign In" : "Sign Up"}
      size="sm"
    >
      <div className="mb-4 flex flex-col items-center">
        <Button
          //  variant="outline"
          onClick={() => signIn("google")}
          className="w-full bg-blue border text-black hover:bg-blue-50"
        >
          Continue with Google
        </Button>
        <span className="text-gray-400 text-sm mt-2">or</span>
      </div>

      <div className="mb-4 flex justify-center gap-4">
        <Button
          variant={activeTab === "signIn" ? "primary" : "ghost"}
          onClick={() => handleTabChange("signIn")}
        >
          Sign In
        </Button>
        <Button
          variant={activeTab === "signUp" ? "primary" : "ghost"}
          onClick={() => handleTabChange("signUp")}
        >
          Sign Up
        </Button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded p-2 text-sm ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {activeTab === "signIn" ? (
        <form className="space-y-4" onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={signInData.email}
            onChange={handleSignInChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={signInData.password}
            onChange={handleSignInChange}
            className="w-full p-2 border rounded"
          />
          <Button type="submit" className="w-full" variant="primary">
            Sign In
          </Button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={signUpData.name}
            onChange={handleSignUpChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={signUpData.email}
            onChange={handleSignUpChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={signUpData.password}
            onChange={handleSignUpChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={signUpData.phone}
            onChange={handleSignUpChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            value={signUpData.location}
            onChange={handleSignUpChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center">
            <input
              id="agree"
              type="checkbox"
              required
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I agree to the Terms & Privacy Policy
            </label>
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={!isAgreed}
          >
            Sign Up
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default SignInModal;
