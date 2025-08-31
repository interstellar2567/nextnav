import React, { useState ,useEffect} from 'react';
import BookAppointmentModal from "./BookAppointmentModal"
import { ToastContainer } from "react-toastify";
import { Star } from 'lucide-react';

// Type definitions based on your MongoDB schema
interface Availability {
  isAvailable: boolean;
  hours: string;
}

interface Doctor {
  name: string;
  specialization: string;
  availability: {
    monday: Availability;
    tuesday: Availability;
    wednesday: Availability;
    thursday: Availability;
    friday: Availability;
    saturday: Availability;
    sunday: Availability;
  };
}

interface Department {
  name: string;
  totalBeds: number;
  availableBeds: number;
  doctors: Doctor[];
  equipment: string[];
  facilities: string[];
}

interface Hospital {
  _id: string;
  hospitalName: string;
  state: string;
  city: string;
  pincode: string;
  contactNumber: string;
  departments: Department[];
}

interface HospitalProps {
  hospitals: Hospital[];
}

const Hospital: React.FC<HospitalProps> = ({ hospitals }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  
  // Handle hospital selection
  const handleHospitalClick = (hospital: Hospital): void => {
    setSelectedHospital(hospital);
    setSelectedDepartment(null);
  };
  
  // Handle department selection
  const handleDepartmentClick = (department: Department): void => {
    setSelectedDepartment(department);
  };
  
  // Go back to hospital list
  const handleBackToHospitals = (): void => {
    setSelectedHospital(null);
    setSelectedDepartment(null);
  };
  
  // Go back to departments
  const handleBackToDepartments = (): void => {
    setSelectedDepartment(null);
  };
  
  // Format availability hours
  const formatAvailability = (day: Availability): string => {
    if (!day.isAvailable) return "Not Available";
    return day.hours;
  };
  
  // Render doctor schedule
  const renderDoctorSchedule = (doctor: Doctor): JSX.Element => {
    const days: Array<keyof Doctor['availability']> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    return (
       
        
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
         <ToastContainer position="top-right" autoClose={3000} />
        <h4 className="font-medium text-lg mb-2">Weekly Schedule</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {days.map((day) => (
            <div key={day} className="flex justify-between border-b pb-1">
              <span className="capitalize">{day}:</span>
              <span className={doctor.availability[day].isAvailable ? "text-green-600" : "text-red-500"}>
                {formatAvailability(doctor.availability[day])}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Display hospital list
  if (!selectedHospital) {
    return (
      <div className="container mx-auto px-4 py-8">
       <div className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden mt-16">
          {/* Star Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-white animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animationDuration: `${Math.random() * 5 + 2}s`,
                }}
              />
            ))}
          </div>

          {/* Heading */}
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              animateIn ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
              Hospitals Near You
            </h1>
            <p className="text-blue-200 text-lg mt-4">Find the best medical services nearby</p>
          </div>

          {/* Hospital Listings */}
          {hospitals.length === 0 ? (
            <p className="text-gray-500">No hospitals found in your area.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {hospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="relative bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-white cursor-pointer p-6"
                  onClick={() => handleHospitalClick(hospital)}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"></div>
                  <h2 className="text-2xl font-semibold text-white mb-2">{hospital.hospitalName}</h2>
                  <p className="text-gray-400">{hospital.city}, {hospital.state}</p>
                  <p className="text-gray-400">Pincode: {hospital.pincode}</p>
                  <p className="text-gray-300 mt-3"><span className="font-medium">Contact:</span> {hospital.contactNumber}</p>
                  <p className="mt-3 text-blue-400 font-medium">
                    {hospital.departments.length} Departments Available
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Display department list for a selected hospital
  if (selectedHospital && !selectedDepartment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={handleBackToHospitals}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Hospitals
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{selectedHospital.hospitalName}</h1>
          <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-2">
            <p>{selectedHospital.city}, {selectedHospital.state} - {selectedHospital.pincode}</p>
            <span className="hidden md:inline mx-2">•</span>
            <p>Contact: {selectedHospital.contactNumber}</p>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedHospital.departments.map((department, index) => (
            <div 
              key={index}
              className="border rounded-lg shadow hover:shadow-md transition-shadow p-6 cursor-pointer"
              onClick={() => handleDepartmentClick(department)}
            >
              <h3 className="text-lg font-medium mb-3">{department.name}</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Beds:</span>
                <span className="font-medium">{department.totalBeds}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Available Beds:</span>
                <span className="font-medium text-green-600">{department.availableBeds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doctors:</span>
                <span className="font-medium">{department.doctors.length}</span>
              </div>
              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Display department details
  if (selectedHospital && selectedDepartment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center mb-6">
          <button 
            onClick={handleBackToDepartments}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2 md:mb-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Departments
          </button>
          
          <span className="hidden md:inline mx-3">|</span>
          
          <div className="text-gray-600">
            {selectedHospital.hospitalName} &gt; {selectedDepartment.name}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{selectedDepartment.name} Department</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Total Beds</p>
              <p className="text-xl font-bold text-blue-800">{selectedDepartment.totalBeds}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Available Beds</p>
              <p className="text-xl font-bold text-green-800">{selectedDepartment.availableBeds}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Doctors</p>
              <p className="text-xl font-bold text-purple-800">{selectedDepartment.doctors.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">Occupancy</p>
              <p className="text-xl font-bold text-yellow-800">
                {Math.round(((selectedDepartment.totalBeds - selectedDepartment.availableBeds) / selectedDepartment.totalBeds) * 100)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctors Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Doctors</h2>
              {selectedDepartment.doctors.length === 0 ? (
                <p className="text-gray-500">No doctors available in this department.</p>
              ) : (
                <div className="space-y-6">
                  {selectedDepartment.doctors.map((doctor, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <h3 className="text-lg font-medium">{doctor.name}</h3>
                          <p className="text-blue-600">{doctor.specialization}</p>
                        </div>
                        <button
                  className="mt-2 md:mt-0 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  Book Appointment
                </button>
                      </div>
                      {renderDoctorSchedule(doctor)}
                    </div>
                  ))}
                    {selectedDoctor && (
        <BookAppointmentModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
                </div>
              )}
            </div>
          </div>
        
          
          {/* Facilities & Equipment */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Facilities</h2>
              {selectedDepartment.facilities.length === 0 ? (
                <p className="text-gray-500">No facilities information available.</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {selectedDepartment.facilities.map((facility, index) => (
                    <li key={index} className="text-gray-700">{facility}</li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Equipment</h2>
              {selectedDepartment.equipment.length === 0 ? (
                <p className="text-gray-500">No equipment information available.</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {selectedDepartment.equipment.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default Hospital;