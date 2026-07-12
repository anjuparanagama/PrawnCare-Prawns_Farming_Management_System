"use client";

import { useState, useEffect } from "react";
import { Package, RefreshCcw, PlusCircle, CalendarDays } from "lucide-react";

export default function InventoryPage() {
  // -----------------------------
  // States
  // -----------------------------

  const [items, setItems] = useState([]);

  // Update Stock
  const [id, setItemID] = useState("");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Issue Item
  const [idIssue, setIdIssue] = useState("");
  const [qtyIssue, setQtyIssue] = useState("");
  const [dateIssue, setDateIssue] = useState(
    new Date().toISOString().split("T")[0],
  );

  // Register Item
  // Register Item
  const [newItem, setNewItem] = useState("");
  const [initialQty, setInitialQty] = useState("");
  const [newItemType, setNewItemType] = useState("");

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  // -----------------------------
  // Load Items
  // -----------------------------

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/inventory/items`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => console.log("Error fetching items:", err));
  }, []);

  // -----------------------------
  // Issue Item
  // -----------------------------

  const handleIssue = async (e) => {
    e.preventDefault();

    if (!idIssue) {
      alert("Please select an item.");
      return;
    }

    if (!qtyIssue || isNaN(qtyIssue) || Number(qtyIssue) <= 0) {
      alert("Please enter valid quantity.");
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/inventory/issue/${idIssue}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: qtyIssue,
          date: dateIssue,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);

        setIdIssue("");
        setQtyIssue("");
        setDateIssue(new Date().toISOString().split("T")[0]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Network Error");
    }
  };

  // -----------------------------
  // Update Stock
  // -----------------------------

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("Please select an item.");
      return;
    }

    if (!qty || isNaN(qty) || Number(qty) <= 0) {
      alert("Please enter valid quantity.");
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/inventory/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty,
          date,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);

        setItemID("");
        setQty("");
        setDate(new Date().toISOString().split("T")[0]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Network Error");
    }
  };

  // -----------------------------
  // Register Item
  // -----------------------------

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!newItem.trim()) {
      alert("Please enter an item name");
      return;
    }

    if (!initialQty || Number(initialQty) < 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (!newItemType) {
      alert("Please select a type");
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/inventory/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: newItem,
          qty: initialQty,
          type: newItemType,
        }),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        alert(data.message || "Item added successfully");

        setNewItem("");
        setInitialQty("");
        setNewItemType("");

        // refresh items list
        fetch(`${apiBaseUrl}/api/inventory/items`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setItems(data);
            }
          });
      } else {
        alert(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error(error);

      alert("Network error. Please check if backend is running.");
    }
  };
  return (
    <div className="min-h-screen ">
      <div className="max-w-[26rem] grid grid-cols-1 gap-4">
        {/* ================= ISSUE ITEMS ================= */}
        <div className="rounded-2xl bg-white shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="uppercase tracking-widest text-xs font-bold text-slate-500">
              Issue Items
            </h2>

            <Package className="text-blue-600" size={18} />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  Item ID
                </label>

                <select
                  value={idIssue}
                  onChange={(e) => setIdIssue(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an Item</option>

                  {items.map((item) => (
                    <option key={item.item_id} value={item.item_id}>
                      {item.item_id} - {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  value={qtyIssue}
                  onChange={(e) => setQtyIssue(e.target.value)}
                  placeholder="Enter Qty"
                  className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  readOnly
                  value={dateIssue}
                  className="w-full rounded-xl border border-gray-300 px-3 py-3 bg-gray-50"
                />

                <CalendarDays
                  size={18}
                  className="absolute right-3 top-3 text-gray-400"
                />
              </div>
            </div>

            <button
              onClick={handleIssue}
              className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 transition text-white py-3 font-semibold"
            >
              Issue Inventory
            </button>
          </div>
        </div>

        {/* ================= UPDATE STOCK ================= */}

        <div className="rounded-2xl bg-white shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="uppercase tracking-widest text-xs font-bold text-slate-500">
              Update Stock
            </h2>

            <RefreshCcw className="text-teal-600" size={18} />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  Item ID
                </label>

                <select
                  value={id}
                  onChange={(e) => setItemID(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select an Item</option>

                  {items.map((item) => (
                    <option key={item.item_id} value={item.item_id}>
                      {item.item_id} - {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  New Balance
                </label>

                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Enter Qty"
                  className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  readOnly
                  value={date}
                  className="w-full rounded-xl border border-gray-300 px-3 py-3 bg-gray-50"
                />

                <CalendarDays
                  size={18}
                  className="absolute right-3 top-3 text-gray-400"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full rounded-xl bg-teal-700 hover:bg-teal-800 transition text-white py-3 font-semibold"
            >
              Update Record
            </button>
          </div>
        </div>
        {/* ================= REGISTER ITEM ================= */}

        <div className="rounded-2xl bg-white shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="uppercase tracking-widest text-xs font-bold text-slate-500">
              Register New Item
            </h2>

            <PlusCircle className="text-indigo-600" size={18} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Item Name
              </label>

              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter Item Name"
                className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Item Type
              </label>

              <select
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="prawns">Prawns</option>
                <option value="feeds">Feeds</option>
                <option value="equipments">Equipments</option>
                <option value="medicine">Medicine</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Initial Qty
              </label>

              <input
                type="number"
                value={initialQty}
                onChange={(e) => setInitialQty(e.target.value)}
                placeholder="Enter Quantity"
                className="w-full rounded-xl border border-gray-300 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleRegister}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-3 shadow-md"
            >
              ADD ITEM TO CATALOG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
