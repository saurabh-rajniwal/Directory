// src/components/ProfileHeader.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of countries from the country API
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    const fetchDateTime = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${selectedCountry}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const newTime = new Date(
          new Date().toLocaleString("en-US", { timeZone: data.timezone })
        );
        const hours = newTime.getHours().toString().padStart(2, "0");
        const minutes = newTime.getMinutes().toString().padStart(2, "0");
        const seconds = newTime.getSeconds().toString().padStart(2, "0");
        const formattedDate = `${hours}:${minutes}:${seconds}`;
        setCurrentDateTime(formattedDate);
      } catch (error) {
        console.error("Error fetching current date and time:", error);
      }
    };

    fetchDateTime();
    let intervalId;

    if (selectedCountry && !isTimerPaused) {
      // Set up an interval to fetch the current date and time every second
      intervalId = setInterval(fetchDateTime, 1000);
    }
    // Clear the interval on component unmount or when the timer is paused
    return () => clearInterval(intervalId);
  }, [selectedCountry, isTimerPaused]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;

    // Update the selected country
    setSelectedCountry(selectedCountry);
  };

  const handleBackButtonClick = () => {
    // Redirect to the home page
    navigate(`/`);
  };

  const handleTimerToggle = () => {
    // Toggle the timer state
    setIsTimerPaused((prevState) => !prevState);
  };

  return (
    <div className="profile-header">
      <button className="back-button" onClick={handleBackButtonClick}>
        Back
      </button>
      <div className="header-controls">
        <label htmlFor="countrySelector">Select Country :</label>
        <select
          id="countrySelector"
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Display the current date and time on the screen */}

      <p className="timer">
        <strong>Current Time:</strong> {currentDateTime}
      </p>

      <button
        className={`timer-button ${isTimerPaused ? "paused" : ""}`}
        onClick={handleTimerToggle}
      >
        {isTimerPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default ProfileHeader;
