"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface Issue {
  id: number;
  label: string;
  points: number;
  icon: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
}

const issues: Issue[] = [
  {
    id: 1,
    label: "Pothole",
    points: 50,
    icon: "/NavLogo.png", // Using project logo as icon
  },
  {
    id: 2,
    label: "Traffic Light Issue",
    points: 75,
    icon: "/NavLogo.png",
  },
  {
    id: 3,
    label: "Road Hazard",
    points: 100,
    icon: "/NavLogo.png",
  },
  {
    id: 4,
    label: "Parking Issue",
    points: 25,
    icon: "/NavLogo.png",
  },
  {
    id: 5,
    label: "Construction Alert",
    points: 40,
    icon: "/NavLogo.png",
  },
  {
    id: 6,
    label: "Other Issue",
    points: 30,
    icon: "/NavLogo.png",
  },
];

const ReportIssuePage = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  const handleSubmit = () => {
    // Stubbed submit functionality
    console.log("Submitted report:", {
      issue: selectedIssue,
      imageFile,
      location,
      description,
    });
    alert("Report submitted (stub)");
    // Reset form
    setSelectedIssue(null);
    setImageFile(null);
    setLocation(null);
    setDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
      <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Report an Issue
      </h1>

      {/* Image Upload and Location Capture at the top */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Attach Media and Location</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Choose Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imageFile && <p className="mt-2 text-sm text-gray-600">Selected file: {imageFile.name}</p>}
          </div>
          <div>
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {location ? "Location Captured" : "Capture Location"}
            </button>
            {location && (
              <p className="mt-2 text-sm text-gray-600">
                Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Your Impact Feature */}
      <div className="mt-10 p-6 bg-green-50 rounded-lg border border-green-200 shadow-sm relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Impact</h2>
            <p className="text-sm text-gray-700">Making the community safer, one report at a time</p>
          </div>
          <div>
            <span className="inline-block bg-green-700 text-white text-sm font-semibold px-3 py-1 rounded">Level 7</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-700">1247</p>
            <p className="text-sm text-gray-700">Total Points</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">#23</p>
            <p className="text-sm text-gray-700">Community Rank</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">23</p>
            <p className="text-sm text-gray-700">Reports This Month</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">89%</p>
            <p className="text-sm text-gray-700">Accuracy Rate</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-600 mb-1">Progress to Level 8</p>
          <div className="w-full bg-green-200 rounded-full h-3">
            <div className="bg-green-700 h-3 rounded-full" style={{ width: "80%" }}></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">320 pts needed</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {issues.map(({ id, label, points, icon }) => (
          <div
            key={id}
            onClick={() => handleIssueClick({ id, label, points, icon })}
            className={`flex flex-col items-center justify-center border rounded-md p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
              selectedIssue?.id === id ? "border-blue-600 shadow-lg" : "border-gray-300"
            }`}
          >
            <div className="w-8 h-8 mb-2 relative">
              <Image src={icon} alt={label} fill sizes="24px" />
            </div>
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-gray-500">+{points} pts</span>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-white rounded-lg border border-gray-300 shadow-sm max-w-4xl mx-auto">
        {selectedIssue ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Report: {selectedIssue.label}</h2>
            <textarea
              placeholder="Describe your issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded resize-y"
              rows={4}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedIssue || !imageFile || !location || !description.trim()}
              className={`px-6 py-2 rounded transition ${
                selectedIssue && imageFile && location && description.trim()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Submit Report
            </button>
            {(!imageFile || !location || !description.trim()) && (
              <p className="mt-2 text-sm text-red-600">
                Please upload an image, capture your location, and describe your issue before submitting.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-700">Please select an issue above to start your report.</p>
        )}
      </div>

      <div className="mt-10 p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Community Feed
        </h2>
        <ul className="space-y-6">
          <li className="flex justify-between items-start bg-gray-50 p-4 rounded-md shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-800">SafeDriver23 <span className="text-xs text-gray-500 ml-2">2 hours ago</span></p>
              <p className="text-sm text-gray-700">Reported: <span className="font-medium">Pothole</span></p>
              <p className="text-xs text-gray-500">📍 Main St & 3rd Ave</p>
              <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  12
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4H7a2 2 0 01-2-2v-2" />
                  </svg>
                  3
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded mb-2">verified</span>
              <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                </svg>
                +50 pts
              </div>
            </div>
          </li>

          <li className="flex justify-between items-start bg-gray-50 p-4 rounded-md shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-800">CityWatcher <span className="text-xs text-gray-500 ml-2">4 hours ago</span></p>
              <p className="text-sm text-gray-700">Reported: <span className="font-medium">Traffic Light</span></p>
              <p className="text-xs text-gray-500">📍 Oek Street Bridge</p>
              <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  8
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4H7a2 2 0 01-2-2v-2" />
                  </svg>
                  1
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-block bg-gray-300 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">pending</span>
            </div>
          </li>

          <li className="flex justify-between items-start bg-gray-50 p-4 rounded-md shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-800">CommunityCare <span className="text-xs text-gray-500 ml-2">6 hours ago</span></p>
              <p className="text-sm text-gray-700">Reported: <span className="font-medium">Road Hazard</span></p>
              <p className="text-xs text-gray-500">📍 Highway 101 North</p>
              <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  24
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4H7a2 2 0 01-2-2v-2" />
                  </svg>
                  7
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded mb-2">resolved</span>
              <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                </svg>
                +100 pts
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReportIssuePage;
