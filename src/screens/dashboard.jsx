import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const processedRef = ref(database, "sensors/processed");

    const unsubscribe = onValue(processedRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
        console.log("No data available");
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Sensor Dashboard</h2>
      {data ? (
        <div style={{ 
          border: "1px solid #ccc", 
          borderRadius: "8px", 
          padding: "20px", 
          maxWidth: "400px", 
          backgroundColor: "#f9f9f9" 
        }}>
          <p><strong>Ammonia (PPM):</strong> {data.ammoniaPPM}</p>
          <p><strong>pH Value:</strong> {data.phValue}</p>
          <p><strong>Water Quality:</strong> {data.waterLabel}</p>
          <p><strong>Water Level:</strong> {data.waterLevelNumeric}</p>
        </div>
      ) : (
        <p>Loading sensor data...</p>
      )}
    </div>
  );
};

export default Dashboard;
