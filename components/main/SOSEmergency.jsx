import React, { useState, useRef } from "react";
import { AlertCircle, Plus, Trash2, Send, Copy, Mail } from "lucide-react";

export default function SOSEmergency() {
  const [numbers, setNumbers] = useState([""]);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const messageRef = useRef(null);

  const handleChange = (index, value) => {
    // Only allow numbers and + (for country code)
    const sanitizedValue = value.replace(/[^\d+]/g, '');
    const newNumbers = [...numbers];
    newNumbers[index] = sanitizedValue;
    setNumbers(newNumbers);
  };

  const removeNumber = (index) => {
    if (numbers.length > 1) {
      const newNumbers = [...numbers];
      newNumbers.splice(index, 1);
      setNumbers(newNumbers);
    }
  };

  const addNumberField = () => {
    setNumbers([...numbers, ""]);
  };

  const validatePhoneNumber = (number) => {
    const trimmed = number.trim();
    if (trimmed === "") return false;
    
    // Remove spaces and any formatting
    const cleaned = trimmed.replace(/\s+/g, '');
    
    // Basic validation - at least 10 digits
    return cleaned.length >= 10;
  };

  const validateNumbers = (nums) => {
    const validNumbers = nums.filter(num => validatePhoneNumber(num));
    if (validNumbers.length === 0) {
      setError("Please enter at least one valid phone number (min. 10 digits)");
      return null;
    }
    return validNumbers;
  };

  const copyToClipboard = () => {
    if (!locationInfo) return;
    
    const { message } = locationInfo;
    if (messageRef.current) {
      messageRef.current.select();
      document.execCommand('copy');
      alert("SOS message copied to clipboard!");
    }
  };

  // Send message via WhatsApp
  const sendViaWhatsApp = (phoneNumber, message) => {
    // Format the phone number for WhatsApp (remove any + sign)
    const formattedNumber = phoneNumber.startsWith('+') 
      ? phoneNumber.substring(1) 
      : phoneNumber;
      
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp API URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');
    
    return true;
  };

  // Send to first contact via WhatsApp directly
  const sendToFirstContact = () => {
    if (!locationInfo || !locationInfo.validNumbers || locationInfo.validNumbers.length === 0) {
      return;
    }
    
    const firstNumber = locationInfo.validNumbers[0];
    sendViaWhatsApp(firstNumber, locationInfo.message);
  };

  const sendLocation = () => {
    setError("");
    setIsSending(true);
    setLocationInfo(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsSending(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `SOS! I need help! My current location: ${locationUrl}`;

        const validNumbers = validateNumbers(numbers);
        if (!validNumbers) {
          setIsSending(false);
          return;
        }

        // Store the information for display and for sending
        setLocationInfo({
          message,
          validNumbers,
          latitude,
          longitude
        });

        // Automatically open WhatsApp with the first number
        if (validNumbers.length > 0) {
          setTimeout(() => {
            sendViaWhatsApp(validNumbers[0], message);
          }, 500); // Slight delay to ensure UI updates first
        }

        setIsSending(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 10000);
      },
      (error) => {
        setError(`Unable to retrieve location: ${error.message}`);
        setIsSending(false);
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-600 p-4 text-white flex items-center justify-center">
        <AlertCircle className="mr-2" />
        <h1 className="text-xl font-bold">SOS WHATSAPP ALERT</h1>
      </div>

      <div className="p-6">
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
            <span className="mr-2">✓</span>
            <span>Location retrieved successfully! Launching WhatsApp...</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}

        <p className="mb-4 text-gray-600">
          Add WhatsApp contacts who will receive your location when you send an SOS alert.
        </p>

        {numbers.map((num, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="flex-1 relative">
              <input
                type="tel"
                value={num}
                placeholder="Enter WhatsApp number (with country code)"
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="text-xs text-gray-500 mt-1">
                Example: 9876543210 or +919876543210
              </div>
            </div>
            {numbers.length > 1 && (
              <button
                onClick={() => removeNumber(index)}
                className="ml-2 p-2 text-red-500 hover:text-red-700"
                aria-label="Remove contact"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addNumberField}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} className="mr-1" />
          <span>Add Another Contact</span>
        </button>

        <button
          onClick={sendLocation}
          disabled={isSending}
          className="w-full p-4 bg-green-600 text-white rounded-md font-bold flex items-center justify-center hover:bg-green-700 transition-colors disabled:bg-green-400"
        >
          {isSending ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Getting Your Location...
            </span>
          ) : (
            <span className="flex items-center">
              <Send size={16} className="mr-2" />
              SEND SOS VIA WHATSAPP
            </span>
          )}
        </button>

        {locationInfo && (
          <div className="mt-4 border rounded-md p-4 bg-gray-50">
            <h3 className="font-bold mb-2">Your SOS Message:</h3>
            <textarea
              ref={messageRef}
              className="w-full p-3 border rounded-md mb-4 bg-white"
              rows={4}
              value={locationInfo.message}
              readOnly
            />
            
            <div className="flex flex-col space-y-3">
              <p className="text-sm font-medium">Send to other contacts:</p>
              
              {locationInfo.validNumbers.length > 1 && (
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {locationInfo.validNumbers.map((number, index) => (
                    // Skip the first contact as it's already been opened automatically
                    index > 0 ? (
                      <button
                        key={index}
                        onClick={() => sendViaWhatsApp(number, locationInfo.message)}
                        className="flex items-center justify-center p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Send to {number}
                      </button>
                    ) : null
                  ))}
                </div>
              )}
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Copy size={16} className="mr-2" />
                Copy Message to Clipboard
              </button>
              
              <div className="text-sm mt-2 text-gray-600">
                <p>You can also:</p>
                <ul className="list-disc ml-6 mt-1">
                  <li>Send this message using other messaging apps</li>
                  <li>Call emergency services directly</li>
                  <li>Share this browser tab with your contacts</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}