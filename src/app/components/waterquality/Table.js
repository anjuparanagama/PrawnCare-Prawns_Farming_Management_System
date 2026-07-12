"use client";

import React, { useState, useEffect } from "react";
import ResponsiveTable from "../Base/Table";

function Table() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  const columns = [
    { key: "date", label: "DATE" },
    { key: "time", label: "TIME" },
    { key: "tank", label: "TANK NO:" },
    { key: "o2", label: "WATER LEVEL (m)" },
    { key: "ph", label: "PH LEVEL" },
    { key: "temp", label: "TEMPERATURE (°C)" },
    { key: "nh3", label: "SALINITY LEVEL" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/waterquality/sensor-data`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const formattedData = data.map((item) => {
          const dateObj = new Date(item.Date);

          return {
            date: dateObj.toISOString().split("T")[0].replace(/-/g, "/"),

            time: convertTime(item.Time),

            tank: item.Pond_ID?.toString() || "-",

            o2: item.Water_Level ?? "-",

            ph: item.pH ?? "-",

            temp: item.WaterTemp ?? "-",

            nh3: item.TDS ?? "-",
          };
        });

        setRows(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiBaseUrl]);

  const convertTime = (timeStr) => {
    if (!timeStr) return "-";

    const hour = parseInt(timeStr.split(".")[0]);

    const ampm = hour >= 12 ? "PM" : "AM";

    const hour12 = hour % 12 || 12;

    return `${hour12.toString().padStart(2, "0")}:00 ${ampm}`;
  };

  if (loading) {
    return (
      <div className="pl-6 bg-white rounded-lg shadow-md p-4">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="pl-6 bg-white rounded-lg shadow-md p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <ResponsiveTable
      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      mobileTitle="Water Quality Data"
    />
  );
}

export default Table;
