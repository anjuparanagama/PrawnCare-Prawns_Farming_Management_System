"use client";

import React, { useEffect, useState } from "react";
import ResponsiveTable from "../Base/Table";

export const PurchaseBottom = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  const columns = [
    {
      key: "id",
      label: "PURCH. ID",
    },
    {
      key: "itemName",
      label: "ITEM NAME",
    },
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "supplier",
      label: "SUPPLIER",
    },
    {
      key: "quantity",
      label: "QUANTITY",
    },
    {
      key: "price",
      label: "PRICE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/purchase/purchased-items-details`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch purchase data");
        }

        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item.supply_order_id ?? "-",

          itemName: item.name ?? "-",

          date: item.order_date
            ? new Date(item.order_date).toISOString().split("T")[0]
            : "-",

          supplier: item.supplier_name ?? "-",

          quantity: item.quantity ?? "-",

          price: item.price
            ? `Rs. ${Number(item.price).toLocaleString()}`
            : "Rs. 0",

          status: item.status ?? "-",
        }));

        setPurchaseData(formattedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseData();
  }, [apiBaseUrl]);

  return (
    <ResponsiveTable
      columns={columns}
      data={purchaseData}
      loading={loading}
      error={error}
      mobileTitle="Purchase Details"
    />
  );
};

export default PurchaseBottom;
