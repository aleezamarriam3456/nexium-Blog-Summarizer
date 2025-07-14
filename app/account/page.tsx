"use client";

import { useState } from "react";

export default function AccountPage() {
  // For demo: static user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    profilePic: "/default-profile.png",
    createdAt: "2024-01-15",
    subscription: "Free Plan",
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  function handleLogout() {
    alert("Logged out (mock).");
  }

  function handleDeleteAccount() {
    alert("Account deleted (mock).");
    setShowConfirmDelete(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-[#2c2a29]">Account</h1>

      <section className="mb-8 flex items-center gap-6">
        <img
          src={user.profilePic}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-[#2c2a29]">{user.email}</p>
          <p className="text-gray-500 text-sm">Member since: {user.createdAt}</p>
          <p className="mt-1 text-[#2c2a29]">Subscription: {user.subscription}</p>
        </div>
      </section>

      <section className="mb-8">
        <button
          onClick={handleLogout}
          className="bg-[#9b5de5] text-white px-6 py-3 rounded hover:bg-[#7a40c9]"
        >
          Log Out
        </button>
      </section>

      <section>
        <button
          onClick={() => setShowConfirmDelete(true)}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          Delete Account
        </button>

        {showConfirmDelete && (
          <div className="mt-4 p-4 border border-red-600 bg-red-50 rounded">
            <p className="mb-4 text-red-700 font-semibold">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="mr-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
