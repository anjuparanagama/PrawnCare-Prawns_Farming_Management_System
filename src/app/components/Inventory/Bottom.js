"use client";

import * as React from "react";
import ResponsiveTable from "../Base/Table"; // path එක adjust කරන්න

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  React.useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/inventory/table`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, [apiBaseUrl]);

  const columns = [
    {
      key: "itemID",
      label: "Inventory ID",
    },
    {
      key: "itemName",
      label: "Item Name",
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (row) => {
        const quantity = row.Quantity || row.quantity || 0;
        const threshold = row.threshold || 0;

        return (
          <>
            {quantity}
            {quantity < threshold + 25 && <span className="ml-2">⚠️</span>}
          </>
        );
      },
    },
  ];

  const formattedRows = rows.map((row) => ({
    ...row,

    // normalize backend fields
    itemID: row.itemID || row.item_id,

    itemName: row.itemName || row.name,

    quantity: row.Quantity || row.quantity,
  }));

  return (
    <ResponsiveTable
      columns={columns}
      data={formattedRows}
      loading={loading}
      error={error}
      mobileTitle="Inventory"
      pageSize={20}
      showSeeAll={true}
      emptyMessage="No inventory items found"
    />
  );
}
