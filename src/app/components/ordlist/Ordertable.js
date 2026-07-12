"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResponsiveTable from "../Base/Table";
import Searchbar from "./Searchbar"; // Adjust the import path as necessary

function createData(Order_ID, Customer, PrawnType, Status, Amount, Quantity) {
  return { Order_ID, Customer, PrawnType, Status, Amount, Quantity };
}

export default function OrderTable() {
  const router = useRouter();
  const [rows, setRows] = useState([]); // Initialize as an empty array
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  const columns = [
    { key: "Order_ID", label: "ORDER ID" },
    { key: "Customer", label: "CUSTOMER" },
    { key: "PrawnType", label: "PRAWN TYPE" },
    { key: "Status", label: "STATUS", type: "status" },
    { key: "Amount", label: "AMOUNT", type: "currency", align: "right" },
    { key: "Quantity", label: "QUANTITY", align: "right" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/orders/order-table`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched orders data:", data); // Debug log

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        const formattedData = data.map((order) =>
          createData(
            order.Order_ID || order.order_id,
            order.Customer || order.customer,
            order.PrawnType || order.prawnType,
            order.Status || order.status,
            Number(order.Amount || order.amount || 0),
            Number(order.Quantity || order.quantity || 0),
          ),
        );
        setRows(formattedData);
        setFilteredRows(formattedData);
      } catch (err) {
        setError(`Error fetching orders: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilter = ({ searchTerm, selectedStatus }) => {
    const filtered = rows.filter((row) => {
      const matchesSearchTerm =
        row.Customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.Order_ID.toString().includes(searchTerm);
      const matchesStatus = selectedStatus
        ? row.Status === selectedStatus
        : true;
      return matchesSearchTerm && matchesStatus;
    });
    setFilteredRows(filtered);
  };

  const handleRowClick = (orderId) => {
    router.push(`/Orders/${orderId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Searchbar onFilter={handleFilter} />
      <ResponsiveTable
        columns={columns}
        data={filteredRows}
        rowClickable={true}
        onRowClick={(row) => handleRowClick(row.Order_ID)}
        mobileTitle="Orders"
        emptyMessage="No orders found"
      />
    </div>
  );
}
