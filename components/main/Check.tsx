"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteMap from "./RouteMap";
import { useSearchParams } from "next/navigation";
import {
  Map,
  MapPin,
  Navigation,
  Clock,
  AlertTriangle,
  ThumbsUp,
  CalendarClock,
  Gauge,
  Hotel,
  Fuel,
  Leaf,
  Ticket, // For tolls
  DollarSign,
  IndianRupee, // For cost
} from "lucide-react";

interface Coordinate {
  lat: number;
  lon: number;
}

type Route = {
  road_name: string;
  road_cls?: string;
  duration: number;
  distance: number;
  coordinates: Coordinate[];
  id: number;
  future_time_min?: number;
  complexity_score?: string;
  recommendation?: string;
  future_recommendation?: string;
  image_url?: string;
  petrol_pumps?: { [key: string]: string }; // Petrol pumps data
  hotels?: { [key: string]: string }; // Hotels data
  distance_km?: string | number;
  predicted_time_min?: string | number;
  carbon_emission?: number; // Carbon emission in kg CO2
  co2_emissions_kg?: number; // CO2 emissions from API response
  environmental_impact?: string; // Environmental impact message
  is_eco_friendly?: boolean; // Whether the route is eco-friendly
  no_of_tolls?: string; // Number of tolls on the route
  cost_of_each_tolls?: string; // Cost per toll
  sum_of_cost_of_each_tolls?: string; // Total toll cost
};

const EmissionsFormulaPopup = ({ isVisible, setIsVisible }) => {
  return (
    <div className={`absolute right-16 top-10 z-50 transition-all duration-300 transform translate-x-1/4 -translate-y-full mt-2 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
      <div className="bg-gradient-to-br from-[#1a2d4c] to-[#2a3a50] backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 shadow-lg shadow-cyan-500/20 w-72">
        <div className="flex items-center mb-2">
          <svg
            className="w-5 h-5 text-orange-400 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 className="text-white font-medium text-sm">CO₂ Emission Formula</h3>
        </div>
        <div className="bg-gray-800/70 p-3 rounded-lg my-2 border border-gray-700/70">
          <div className="text-cyan-300 font-mono text-center text-sm">
            emissions = distance_km × 0.2 × congestion_factor
          </div>
        </div>
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>• 0.2 kg CO₂/km:</span>
            <span className="text-orange-300">Avg. emission</span>
          </div>
          <div className="flex justify-between">
            <span>• congestion_factor:</span>
            <span className="text-orange-300">1.0-1.5</span>
          </div>
          <div className="flex justify-between">
            <span>• Lower values:</span>
            <span className="text-green-300">More eco-friendly</span>
          </div>
        </div>
        {/* Triangle pointer at the bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#2a3a50] rotate-45 border-r border-b border-gray-700/50"></div>
      </div>
    </div>
  );
};

// Carbon emission popup component
const CarbonEmissionPopup = ({
  emission,
  isEcoFriendly,
  environmentalImpact,
}: {
  emission: number;
  isEcoFriendly: boolean;
  environmentalImpact?: string;
}) => {
  return (
    <div className="absolute left-0 right-0 mx-auto w-5/6 -top-28 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
      <div className="bg-gradient-to-br from-[#1a2d4c] to-[#2a3a50] backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 shadow-lg shadow-cyan-500/20">
        <div className="flex items-center mb-2">
          <Leaf
            className={`w-5 h-5 ${
              isEcoFriendly ? "text-green-400" : "text-orange-400"
            } mr-2`}
          />
          <h3 className="text-white font-medium text-lg">Carbon Emission</h3>
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300">CO₂ emission:</span>
          <span className="text-lg font-bold text-white">
            {emission.toFixed(1)} kg
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-3 w-full bg-gray-700 rounded-full mb-3 overflow-hidden">
          <div
            className={`h-full ${
              isEcoFriendly ? "bg-green-500" : "bg-orange-500"
            } rounded-full`}
            style={{ width: `${Math.min((emission / 20) * 100, 100)}%` }} // Scale to percentage (max 20kg)
          ></div>
        </div>

        {/* Environmental impact message */}
        <div
          className={`text-center p-2 rounded-lg ${
            isEcoFriendly
              ? "bg-green-500/20 text-green-300"
              : "bg-orange-500/20 text-orange-300"
          } font-medium`}
        >
          {environmentalImpact ||
            (isEcoFriendly
              ? "This is an eco-friendly route option 🌱"
              : "Consider a more eco-friendly option to reduce emissions 🌍")}
        </div>
      </div>
    </div>
  );
};

// Thank you message for selecting eco-friendly route
const EcoFriendlyThankYou = () => {
  return (
    <div className="fixed top-6 left-0 right-0 mx-auto w-96 z-50 animate-slideInDown">
      <div className="bg-gradient-to-r from-green-600 to-green-900 p-4 rounded-xl border border-green-400 shadow-xl flex items-center">
        <Leaf className="w-6 h-6 text-green-300 mr-3 animate-pulse" />
        <div>
          <h4 className="text-green-100 font-bold text-lg">Thank You!</h4>
          <p className="text-green-400">
            You've chosen an eco-friendly route and helped reduce carbon
            emissions 🌎
          </p>
        </div>
      </div>
    </div>
  );
};

// RouteEmissions component - fixed positioning and moved it outside main component
const RouteEmissions = ({ route }) => {
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPopupVisible && event.target.closest('.emissions-card') === null) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <>
      {(route.co2_emissions_kg !== undefined || route.carbon_emission !== undefined) && (
        <div 
          className="emissions-card flex items-center bg-gray-800/30 p-3 rounded-lg transition-all hover:bg-gray-800/50 border border-gray-700/20 relative cursor-pointer"
          onClick={togglePopup}
        >
          <Leaf className="w-5 h-5 text-green-400 mr-2" />
          <div>
            <span className="text-gray-400 text-xs block">Emissions</span>
            <span className="font-semibold text-green-300">
              {(route.co2_emissions_kg || route.carbon_emission || 0).toFixed(1)} kg
            </span>
          </div>
        
          {/* Formula Popup that appears on click */}
          <EmissionsFormulaPopup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
        </div>
      )}
    </>
  );
};

export default function Check(): JSX.Element {
  const searchParams = useSearchParams();
  const [start, setStart] = useState<Coordinate | null>(null);
  const [end, setEnd] = useState<Coordinate | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showEcoThankYou, setShowEcoThankYou] = useState<boolean>(false);
  const [lastSelectedEcoRoute, setLastSelectedEcoRoute] = useState<
    number | null
  >(null);

  // Get query parameters
  const startPoint = searchParams?.get("startPoint") || "";
  const destination = searchParams?.get("destination") || "";

  const getCoordinates = async (
    location: string
  ): Promise<Coordinate | null> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      );
      if (response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const fetchRoutes = async () => {
    setError(null);
    setLoading(true);
    setSelectedRouteIndex(null);
    setShowEcoThankYou(false);
    setLastSelectedEcoRoute(null);

    if (!startPoint || !destination) {
      setError("Please enter both a start location and a destination.");
      setLoading(false);
      return;
    }

    const startCoords = await getCoordinates(startPoint);
    const endCoords = await getCoordinates(destination);

    if (!startCoords || !endCoords) {
      setError("Invalid location! Please enter a valid city or place.");
      setLoading(false);
      return;
    }

    setStart(startCoords);
    setEnd(endCoords);

    try {
      // Fetch routes from Mapbox
      const mapboxResponse = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?alternatives=true&geometries=geojson&access_token=pk.eyJ1IjoidHVzaGFyY29kZXgiLCJhIjoiY203dnliN2t3MDFhczJscjE5bDV5NXFrZyJ9.NSgO5u5JC4GDocUdsKP6wA`
      );
      let extractedRoutes = mapboxResponse.data.routes.map(
        (route: any, index: number) => ({
          road_name: route.legs[0].summary,
          duration: route.duration,
          distance: route.distance,
          coordinates: route.geometry.coordinates.map(
            ([lon, lat]: [number, number]) => ({ lat, lon })
          ),
          id: index,
        })
      );

      // Fetch additional route data from TrafficAI API
      const trafficAIResponse = await axios.post(
        "https://trafficai-production.up.railway.app/predict_routes/",
        {
          start_point: startPoint,
          destination: destination,
        }
      );

      const trafficAIRoutes = trafficAIResponse.data;

      // Match the routes from both sources using `road_name`
      extractedRoutes = extractedRoutes.map((route) => {
        const matchedRoute = trafficAIRoutes.find(
          (trafficRoute: any) => trafficRoute.road_name === route.road_name
        );
        // Add carbon emission data if not present in API (sample calculation)
        if (matchedRoute) {
          // Use API data if available, otherwise generate sample data
          if (!matchedRoute.carbon_emission) {
            // Sample calculation based on distance (very rough approximation)
            const distanceKm = matchedRoute.distance_km
              ? parseFloat(matchedRoute.distance_km)
              : route.distance / 1000;

            // Average car emits ~0.2 kg CO2 per km
            matchedRoute.carbon_emission =
              distanceKm * (0.15 + Math.random() * 0.1);

            // Determine if eco-friendly based on emission value
            // Lower emission routes are eco-friendly
            matchedRoute.is_eco_friendly = matchedRoute.carbon_emission < 5;
          }
          return { ...route, ...matchedRoute };
        }
        return route;
      });

      setRoutes(extractedRoutes);
    } catch (error: any) {
      console.error("Error fetching routes:", error);
      setError(
        error.response?.data?.error?.message ||
          "Could not fetch route. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch routes when component loads if we have parameters
  useEffect(() => {
    if (startPoint && destination) {
      fetchRoutes();
    }
  }, [startPoint, destination]);

  // Handle route selection and show eco thank you message
  useEffect(() => {
    // Only show thank you message if a new eco-friendly route is selected
    if (
      selectedRouteIndex !== null &&
      routes[selectedRouteIndex]?.is_eco_friendly &&
      selectedRouteIndex !== lastSelectedEcoRoute
    ) {
      setShowEcoThankYou(true);
      setLastSelectedEcoRoute(selectedRouteIndex);

      // Hide the thank you message after 5 seconds
      const timer = setTimeout(() => {
        setShowEcoThankYou(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [selectedRouteIndex, routes, lastSelectedEcoRoute]);

  // Function to get complexity color
  const getComplexityColor = (complexity: string | undefined) => {
    if (!complexity) return "text-gray-400";
    if (complexity.toLowerCase().includes("low")) return "text-green-400";
    if (complexity.toLowerCase().includes("medium")) return "text-yellow-400";
    if (complexity.toLowerCase().includes("high")) return "text-red-400";
    return "text-cyan-400";
  };

  // Function to get eco badge if route is selected and eco-friendly
  const getEcoBadge = (route: Route, isSelected: boolean) => {
    if (
      isSelected &&
      ((route.co2_emissions_kg !== undefined && route.co2_emissions_kg < 15) ||
        (route.carbon_emission !== undefined && route.carbon_emission < 15) ||
        route.is_eco_friendly)
    ) {
      return (
        <div className="absolute -top-3 -right-3 z-10 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg animate-pulse">
          <Leaf className="w-3 h-3 inline mr-1" />
          ECO
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#030014] font-mono">
      {/* Thank You Message (conditionally rendered) */}
      {showEcoThankYou && <EcoFriendlyThankYou />}

      {/* Left Sidebar - Increased width for wider cards on larger screens */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-4 bg-[#0a0f1e] border-r border-gray-800 overflow-y-auto">
        {/* Floating glow effects - enhanced for better visuals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 bg-purple-600 opacity-15 blur-3xl -top-10 -left-10 rounded-full animate-pulse"></div>
          <div
            className="absolute w-80 h-80 bg-cyan-500 opacity-15 blur-3xl bottom-40 right-20 rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Journey Information - Improved with subtle scale hover effect */}
        <div className="relative z-10 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 mb-6 shadow-lg shadow-cyan-500/5 transition-transform duration-300 hover:scale-[1.02] hover:shadow-cyan-500/20">
          <div className="flex items-center mb-3">
            <MapPin className="w-5 h-5 text-orange-400 mr-2" />
            <h3 className="text-orange-50 font-medium text-lg">From:</h3>
          </div>
          <p className="text-white text-xl font-semibold mb-4 pl-7">
            {startPoint}
          </p>

          <div className="flex items-center mb-3">
            <Navigation className="w-5 h-5 text-orange-400 mr-2" />
            <h3 className="text-orange-50 font-medium text-lg">To:</h3>
          </div>
          <p className="text-white text-xl font-semibold pl-7">{destination}</p>
        </div>

        {/* Animated Refresh Button */}
        <button
          onClick={fetchRoutes}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 mb-6"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Finding Routes...
            </span>
          ) : (
            "Refresh Routes"
          )}
        </button>

        {/* Error Message with slide-in animation */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg mb-6 flex items-start animate-slideIn">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Routes List with staggered animation effect */}
        <div className="space-y-4 relative z-10">
          {routes.map((route, index) => (
            <div
              key={route.id}
              onClick={() => setSelectedRouteIndex(index)}
              className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden animate-fadeIn relative group`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Carbon Emission Popup - Shows ONLY on hover */}
              {(route.co2_emissions_kg !== undefined ||
                route.carbon_emission !== undefined) && (
                <CarbonEmissionPopup
                  emission={
                    route.co2_emissions_kg || route.carbon_emission || 0
                  }
                  isEcoFriendly={
                    (route.co2_emissions_kg && route.co2_emissions_kg < 15) ||
                    (route.carbon_emission && route.carbon_emission < 15) ||
                    route.is_eco_friendly ||
                    false
                  }
                  environmentalImpact={route.environmental_impact}
                />
              )}

              {/* Eco Badge */}
              {getEcoBadge(route, selectedRouteIndex === index)}

              <div
                className={`h-full ${
                  selectedRouteIndex === index
                    ? "border-orange-500 bg-gradient-to-br from-[#2a2a40] to-[#3a3a50] shadow-lg shadow-orange-500/20 scale-[1.02]"
                    : "border-gray-700 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/15 hover:scale-[1.01]"
                }`}
              >
                {/* Route Header with improved spacing and visual hierarchy */}
                <div className="px-5 py-4 border-b border-gray-700/50 flex justify-between items-center">
                  <div className="flex items-center">
                    <Map className="w-5 h-5 text-orange-400 mr-3" />
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {route.road_name || "Route " + (index + 1)}
                    </h3>
                  </div>
                  {selectedRouteIndex === index && (
                    <span className="text-orange-400 text-sm font-medium bg-orange-500/10 px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                {/* Route Details - Improved layout with better grouping */}
                <div className="p-5 space-y-4">
                  {/* Primary metrics - Highlighted and more prominent */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col bg-gray-800/40 p-4 rounded-lg transition-all hover:bg-gray-800/60 border border-gray-700/30">
                      <div className="flex items-center mb-1">
                        <Map className="w-4 h-4 text-orange-400 mr-2" />
                        <span className="text-gray-400 text-sm">Distance</span>
                      </div>
                      <span className="text-white font-bold text-lg pl-6">
                        {route.distance_km ||
                          (route.distance / 1000).toFixed(2)}{" "}
                        km
                      </span>
                    </div>
                    <div className="flex flex-col bg-gray-800/40 p-4 rounded-lg transition-all hover:bg-gray-800/60 border border-gray-700/30">
                      <div className="flex items-center mb-1">
                        <Clock className="w-4 h-4 text-orange-400 mr-2" />
                        <span className="text-gray-400 text-sm">Travel Time</span>
                      </div>
                      <span className="text-white font-bold text-lg pl-6">
                        {route.predicted_time_min ||
                          (route.duration / 60).toFixed(0)}{" "}
                        min
                      </span>
                    </div>
                  </div>

                  {/* Secondary metrics in more compact layout */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Complexity */}
                    {route.complexity_score && (
                      <div className="flex items-center bg-gray-800/30 p-3 rounded-lg transition-all hover:bg-gray-800/50 border border-gray-700/20">
                        <Gauge className="w-5 h-5 text-orange-400 mr-2" />
                        <div>
                          <span className="text-gray-400 text-xs block">Complexity</span>
                          <span
                            className={`font-semibold ${getComplexityColor(
                              route.complexity_score
                            )}`}
                          >
                            {route.complexity_score}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Carbon emissions component */}
                    <RouteEmissions route={route} />
                  </div>

                  {/* Toll information with improved visual hierarchy */}
                  {route.no_of_tolls && route.sum_of_cost_of_each_tolls && (
                    <div className="bg-gray-800/30 p-4 rounded-lg transition-all hover:bg-gray-800/50 border border-gray-700/20">
                      <div className="flex items-center mb-2">
                        <Ticket className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-yellow-300 font-medium">Toll Information</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pl-7">
                        <div className="flex items-center">
                          <span className="text-gray-400 text-sm">Number:</span>
                          <span className="ml-2 font-semibold text-white">
                            {route.no_of_tolls}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 text-sm">Total Cost:</span>
                          <span className="ml-2 font-semibold text-white">
                            ₹{route.sum_of_cost_of_each_tolls}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services available with improved visual design */}
                  {(route.petrol_pumps || route.hotels) && (
                    <div className="bg-gray-800/30 p-4 rounded-lg transition-all hover:bg-gray-800/50 border border-gray-700/20">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 text-orange-400 mr-2" />
                        <span className="text-orange-300 font-medium">Available Services</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pl-7">
                        {/* Petrol Pumps */}
                        {route.petrol_pumps &&
                          Object.keys(route.petrol_pumps).length > 0 && (
                            <div className="flex items-center py-1">
                              <Fuel className="w-4 h-4 text-blue-400 mr-2" />
                              <span className="text-white text-sm">
                                Petrol Pumps
                              </span>
                            </div>
                          )}

                        {/* Hotels */}
                        {route.hotels && Object.keys(route.hotels).length > 0 && (
                          <div className="flex items-center py-1">
                            <Hotel className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-white text-sm">
                              Hotels
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Future Recommendation - Improved styling */}
                  {route.future_recommendation && (
                    <div className="bg-gray-800/30 p-4 rounded-lg transition-all hover:bg-gray-800/50 border-l-4 border-cyan-500">
                      <div className="flex items-center mb-2">
                        <CalendarClock className="w-5 h-5 text-cyan-400 mr-2" />
                        <span className="text-cyan-300 font-medium">
                          Future Travel Advice
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm pl-7">
                        {route.future_recommendation}
                      </p>
                    </div>
                  )}

                  {/* Route Image - Improved presentation */}
                  {route.image_url && (
                    <div className="rounded-lg overflow-hidden border border-gray-700 transition-transform duration-300 hover:scale-[1.02] shadow-md">
                      <img
                        src={route.image_url}
                        alt="Route"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
                  ))}
        {/* Empty state with animation */}
        {!loading && routes.length === 0 && (
          <div className="text-center p-8 text-gray-400 animate-pulse">
            <Map className="w-16 h-16 mx-auto mb-3 text-gray-500 opacity-50" />
            <p className="text-lg">Route information will appear here</p>
          </div>
        )}
      </div>
    </div>

    {/* Right Map Section */}
    <div className="flex-1 relative">
      {/* Map Container */}
      <div className="absolute inset-0">
        {start && end && routes.length > 0 && (
          <RouteMap
            start={start}
            end={end}
            routes={routes}
            selectedRouteIndex={selectedRouteIndex}
          />
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-white text-lg flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading Map...
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-red-900/50 p-6 rounded-lg border border-red-800 text-red-200 flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
            <p className="text-lg">{error}</p>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
