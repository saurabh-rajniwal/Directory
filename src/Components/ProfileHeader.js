// src/components/ProfileHeader.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTimeZones } from "../utils/getTimeZones";

const ProfileHeader = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timePausedAt, setTimePausedAt] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const navigate = useNavigate();

  const setClock = () => {
    const newTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: selectedCountry })
    );
    const hours = newTime.getHours().toString().padStart(2, "0");
    const minutes = newTime.getMinutes().toString().padStart(2, "0");
    const seconds = newTime.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${hours}:${minutes}:${seconds}`;
    setCurrentDateTime(formattedDate);
  };

  useEffect(() => {
    const initTimeZones = async () => {
      setCountries(await getTimeZones());
      setClock();
    };

    initTimeZones();
  }, []);

  useEffect(() => {
    setClock();
  }, [selectedCountry]);

  useEffect(() => {
    if (isTimerPaused) {
      setTimePausedAt(new Date());
      clearInterval(intervalID);
    } else {
      setCurrentDateTime((preDateTime) => preDateTime - timePausedAt);

      if (!intervalID) {
        setIntervalID(setInterval(setClock, 1000));
      }
    }
  }, [isTimerPaused]);

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
