"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import SignInModal from "@/components/HomeComponent/Modal/SignInModal";

export default function FileComplaintDiv() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="h-[400px] flex flex-col items-center justify-center bg-blue-800">
        <div className="relative max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Get Your Voice Heard
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Our platform helps you file effective complaints against companies
            and get real results.
          </p>
          <div className="mt-10 max-w-md mx-auto w-full flex justify-center">
            {user ? (
              <>
                <Link
                  href="/FileComplaint"
                  className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 shadow-md hover:shadow-lg transition-all px-8 py-3 rounded-md font-medium"
                >
                  File a Complaint
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden md:inline-block bg-transparent text-white rounded hover:bg-transparent transition"
              >
                <Link
                  href="/"
                  className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 shadow-md hover:shadow-lg transition-all px-8 py-3 rounded-md font-medium"
                >
                  File a Complaint
                </Link>
              </button>
            )}
          </div>
          <div className="mt-6 text-sm text-blue-100">
            {user ? (
              <Link
                href="/Dashboard"
                className="text-sm text-white hover:text-gray-200 font-medium"
              >
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden md:inline-block bg-transparent text-white rounded hover:bg-transparent transition"
              >
                <Link href="/" className="hover:text-white font-medium">
                  Login
                </Link>
              </button>
            )}
          </div>
        </div>
      </section>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
