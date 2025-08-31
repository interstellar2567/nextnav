import React, { useState, ChangeEvent, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
// const { user } = useUser();
// return <h1>Your User ID: {user?.id}</h1>;
import axios from "axios";
import {
  Autocomplete,
  TextField,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  PhotoCamera,
  Close,
  Place,
  ThumbUp,
  ThumbsUpDown,
  ThumbDown,
} from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";

const predefinedConditions = [
  "Traffic Jam",
  "Roadblock",
  "Accident",
  "Construction",
  "Flooded",
  "Slippery Road",
  "Potholes",
  "Foggy",
  "Landslide",
  "Bridge Collapse",
  "Snow Accumulation",
  "Icy Road",
  "Wildfire Nearby",
  "Hailstorm",
  "Tornado Damage",
  "Power Outage",
  "Low Visibility",
  "Heavy Rain",
  "Sandstorm",
  "Blocked Drain",
  "Oil Spill",
  "Road Under Repair",
  "Vehicle Breakdown",
  "Pedestrian Congestion",
  "Unmarked Speed Bumps",
  "Fallen Trees",
  "Stray Animals",
  "Bike Lane Blocked",
  "No Streetlights",
  "Overcrowded Area",
  "Parade or Event",
  "Festival Crowd",
  "Emergency Vehicles Nearby",
  "Police Checkpoint",
  "Bridge Closed",
  "Toll Booth Traffic",
  "One-Way Traffic",
  "Overloaded Trucks",
  "Speeding Vehicles",
  "Railway Crossing Blocked",
  "Bus Breakdown",
  "Fallen Electric Poles",
  "Protest or Demonstration",
  "Waterlogging",
  "Underground Gas Leak",
  "Fallen Rocks",
  "Detour Suggested",
  "Temporary Road Closure",
  "Long Waiting Time",
  "Unsafe Road Shoulder",
  "Bridge Swing Open",
  "Airport Traffic",
  "Highway Patrol Monitoring",
  "Wildlife Crossing",
  "Mountain Pass Blocked",
  "Fog Lights Required",
  "Truck Overturn",
  "Cyclists in Large Numbers",
  "Multiple Accidents",
  "Diverted Traffic",
  "Landslide Warning",
  "Heavy Vehicle Congestion",
  "Vehicle Fire",
  "Broken Traffic Signals",
  "Debris on Road",
  "Gas Station Overcrowded",
  "Collapsed Tunnel",
  "Tourist Rush",
  "Deserted Area",
  "Roadside Assistance Needed",
  "Excessive Dust",
  "Drowsy Driving Hotspot",
  "Speed Cameras Ahead",
  "Checkpoint Delay",
  "Dangerous Curve",
  "Sharp Turns Ahead",
  "Emergency Roadwork",
  "Weather Advisory",
  "Road Expansion Work",
  "Tunnel Blockage",
  "U-Turn Prohibited",
  "Overbridge Blocked",
  "Rerouted Public Transport",
  "Remote Area Connectivity Issue",
  "Restricted Zone",
  "Cliffside Route Caution",
  "Pedestrian Overpass Blocked",
  "Unsafe Railway Crossing",
  "Dead End",
  "Water Tanker Spillage",
  "Runaway Vehicle",
  "Truck Tire Burst",
  "Herding Animals Nearby",
  "Unmarked Road Work",
  "Sewage Overflow",
  "CCTV Surveillance in Progress",
  "Dust Storm Red Alert",
  "Public Protest Roadblock",
  "Highway Tolls Crowded",
  "Checkpost Verifications",
  "Breakdown in Fast Lane",
  "Emergency Landing Site Nearby",
];

// Road quality type
type RoadQuality = "good" | "medium" | "bad";

// User data interface
interface UserData {
  id: string;
  name: string;
}
const PollPage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [locationOptions, setLocationOptions] = useState<string[]>([]); // Suggestions
  const [condition, setCondition] = useState<string>("");
  const [roadQuality, setRoadQuality] = useState<RoadQuality>("medium");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Function to fetch location suggestions from OpenStreetMap API
  const fetchLocationSuggestions = async (query: string) => {
    if (!query) {
      setLocationOptions([]);
      return;
    }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const suggestions = (response.data as { display_name: string }[]).map((item) => item.display_name);
      setLocationOptions(suggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchLocationSuggestions(location);
    }
  }, [location]);
  // Get user data from local storage on component mount
  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("userId");
      const storedUserName = localStorage.getItem("userName");

      if (storedUserId && storedUserName) {
        setUserData({
          id: storedUserId,
          name: storedUserName,
        });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Handle file selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Preview Image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle road quality change
  const handleRoadQualityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoadQuality(event.target.value as RoadQuality);
  };

  // Handle submitting data to API
  const handleSubmit = async () => {
    if (!location || !condition)
      return alert("Please fill all required fields!");

    const formData = new FormData();
    formData.append("location", location);
    formData.append("roadCondition", condition);
    formData.append("roadQuality", roadQuality);

    formData.append("userID", "24");
    formData.append("userName", "tushar");

    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/events",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Report Submitted Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to submit report.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center p-4 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #28386d, #12184b, #330768)", // Deep space gradient (dark blue to purple)
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <Card
        className=" shadow-2xl bg-opacity-90 backdrop-blur-md border border-gray-800 p-6 rounded-3xl"
        style={{
          background:
            "linear-gradient(170deg, rgba(13, 64, 86, 0.9), rgba(74, 43, 132, 0.9))", // Metallic dark blue gradient
          border: "1px solid rgba(92, 9, 9, 0.1)", // Subtle border for depth
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)", // Enhanced shadow for a floating effect
        }}
      >
        <CardContent className="p-6 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-purple-300 mb-2">
              Report The Road Conditions🛣️
            </h2>
            <p className="text-cyan-400">
              Help others by sharing real-time updates
            </p>
          </div>

          {/* Location Input with Auto-Suggest */}
          <motion.div>
            <Autocomplete
              freeSolo
              options={locationOptions}
              value={location}
              onInputChange={(_, newValue: string | null) => {
                setLocation(newValue || "");
                fetchLocationSuggestions(newValue || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Location"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Place className="text-gray-400 mr-2" />,
                    style: {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#4A5568" },
                      "&:hover fieldset": { borderColor: "#718096" },
                      "&.Mui-focused fieldset": { borderColor: "#48BB78" },
                    },
                  }}
                />
              )}
            />
          </motion.div>

          {/* Road Quality Selector */}
          <motion.div>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                className="text-gradient bg-gradient-to-r from-orange-100 to-green-200 text-transparent bg-clip-text mb-2"
              >
                Road Quality
              </FormLabel>
              <RadioGroup
                row
                value={roadQuality}
                onChange={handleRoadQualityChange}
              >
                <FormControlLabel
                  value="good"
                  control={<Radio color="success" />}
                  label={
                    <>
                      <ThumbUp className="text-green-500" /> Good
                    </>
                  }
                  className="mr-4 text-white"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio color="warning" />}
                  label={
                    <>
                      <ThumbsUpDown className="text-amber-500" /> Medium
                    </>
                  }
                  className="mr-4 text-white"
                />
                <FormControlLabel
                  value="bad"
                  control={<Radio color="error" />}
                  label={
                    <>
                      <ThumbDown className="text-red-500" /> Bad
                    </>
                  }
                  className="text-white"
                />
              </RadioGroup>
            </FormControl>
          </motion.div>

          {/* Condition Selector */}
          <motion.div>
            <Autocomplete
              freeSolo
              options={predefinedConditions}
              value={condition}
              onInputChange={(_, newValue: string | null) =>
                setCondition(newValue || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Condition"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#4A5568" },
                      "&:hover fieldset": { borderColor: "#718096" },
                      "&.Mui-focused fieldset": { borderColor: "#48BB78" },
                    },
                  }}
                />
              )}
            />
          </motion.div>

          {/* Image Upload Section */}
          <motion.div
            className="p-5 rounded-xl shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(16, 20, 36, 0.9), rgba(32, 36, 64, 0.9))", // Metallic dark blue gradient
              border: "1px solid rgba(0, 255, 255, 0.2)", // Neon border
              boxShadow: "0 4px 20px rgba(0, 255, 255, 0.3)", // Glowing shadow
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Label */}
            <label className="block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              📸 Upload Photo Evidence
            </label>

            {/* Upload Box */}
            <div
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-cyan-400 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300"
              style={{
                boxShadow: "0 0 12px rgba(0, 255, 255, 0.2)", // Subtle glow
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Uploaded preview"
                  className="w-40 h-40 object-cover rounded-md mb-4 border-2 border-cyan-400"
                />
              ) : (
                <PhotoCamera className="text-cyan-400 text-6xl mb-4 animate-pulse" />
              )}

              {/* Upload Button */}
              <Button
                component="label"
                variant="contained"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
                style={{
                  boxShadow: "0 0 12px rgba(0, 255, 255, 0.5)", // Neon glow
                }}
              >
                {preview ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </div>
          </motion.div>

          {/* Image Preview Section */}
          {preview && (
            <motion.div
              className="relative mt-6 p-4 rounded-xl shadow-2xl"
              style={{
                background:
                  "linear-gradient(145deg, rgba(16, 20, 36, 0.9), rgba(32, 36, 64, 0.9))", // Metallic dark blue gradient
                border: "1px solid rgba(0, 255, 255, 0.2)", // Neon border
                boxShadow: "0 4px 20px rgba(0, 255, 255, 0.3)", // Glowing shadow
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={preview}
                alt="Uploaded preview"
                className="w-full h-52 object-cover rounded-lg border-2 border-cyan-400"
              />
              {/* Close Button */}
              <IconButton
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 bg-gray-900/90 hover:bg-gray-800/90 transition-all duration-300"
                style={{
                  border: "1px solid rgba(235, 167, 41, 0.3)", // Neon border
                  boxShadow: "0 0 8px rgba(245, 151, 18, 0.3)", // Glowing effect
                }}
              >
                <Close className="text-yellow-400" />
              </IconButton>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:from-green-500 hover:to-blue-600 transition-all duration-300"
              style={{
                boxShadow: "0 4px 18px rgba(0, 255, 0, 0.3)", // Glowing shadow
              }}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PollPage;
