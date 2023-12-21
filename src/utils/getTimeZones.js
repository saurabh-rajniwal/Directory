import { TIMEZONE_ENDPOINT } from "../constants/constant";

export const getTimeZones = async () => {
  try {
    const response = await fetch(`${TIMEZONE_ENDPOINT}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current date and time:", error);
  }
};
