import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Doctor {
  name: string;
  specialization: string;
}

interface BookAppointmentModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
      return;
    }

    toast.success(`Appointment booked with Dr. ${doctor.name} on ${selectedDate} at ${selectedTime} ${selectedPeriod}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
      >
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Book Appointment</h2>
        <p className="text-gray-700 mb-3 text-center">
          <span className="font-semibold">{doctor.name}</span> - {doctor.specialization}
        </p>

        {/* Date Picker */}
        <label className="block text-sm font-medium mb-1">Select Date:</label>
        <input
          type="date"
          className="w-full border p-2 rounded mb-3"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Time Picker with AM/PM */}
        <label className="block text-sm font-medium mb-1">Select Time:</label>
        <div className="flex space-x-2">
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookAppointmentModal;
