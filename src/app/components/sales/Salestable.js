"use client";

import React, { useEffect, useState } from "react";
import ResponsiveTable from "../Base/Table";

export default function Salestable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    { key: "Order_ID", label: "ORDER ID" },
    { key: "Customer", label: "CUSTOMER" },
    { key: "Order_Date", label: "DATE", type: "date" },
    { key: "Status", label: "STATUS", type: "status" },
    { key: "Amount", label: "AMOUNT", type: "currency", align: "right" },
    { key: "Quantity", label: "QUANTITY", align: "right" },
  ];

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/sales/sales`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSeeAll = () => {
    // Implement the logic for "See All" if needed
    console.log("See All clicked");
  };

  return (
    <ResponsiveTable
      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      mobileTitle="Sales Orders"
      onSeeAll={handleSeeAll}
    />
  );
}
