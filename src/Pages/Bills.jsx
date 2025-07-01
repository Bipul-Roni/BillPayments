import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import billsData from "../../public/billData.json";
import { Helmet } from "react-helmet";

const Bills = () => {
  const { balance, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const paidBillsKey = `paidBills_${user?.uid || "guest"}`;

  const [paidBills, setPaidBills] = useState([]);
  const [selectedBillType, setSelectedBillType] = useState("All");

  // Load paid bills from localStorage
  const loadPaidBills = () => {
    const stored = JSON.parse(localStorage.getItem(paidBillsKey)) || [];
    setPaidBills(stored);
  };

  useEffect(() => {
    loadPaidBills();
  }, [paidBillsKey]);

  // Reload paidBills on window focus (optional but recommended)
  useEffect(() => {
    const handleFocus = () => {
      loadPaidBills();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handlePay = (bill) => {
    navigate(`/bills/${bill.id}`);
  };

  // Get unique bill types from billsData for dropdown options
  const billTypes = [
    "All",
    ...new Set(billsData.map((bill) => bill.bill_type)),
  ];

  // Filter bills by selected bill type
  const filteredBills =
    selectedBillType === "All"
      ? billsData
      : billsData.filter((bill) => bill.bill_type === selectedBillType);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Balance: {balance} BDT</h2>

      {/* Dropdown Filter */}
      <div className="mb-4">
        <label htmlFor="billType" className="block font-semibold mb-2">
          Filter by Bill Type:
        </label>
        <select
          id="billType"
          value={selectedBillType}
          onChange={(e) => setSelectedBillType(e.target.value)}
          className="input input-bordered w-full"
        >
          {billTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Bills List */}
      {filteredBills.map((bill) => {
        const isPaid = paidBills.includes(bill.id);

        return (
          <div>
            <Helmet>
              <title>Your All Bill</title>
            </Helmet>

            <div
              key={bill.id}
              className="flex items-center p-4 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <img
                src={bill.icon}
                alt={bill.bill_type}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{bill.organization}</h3>
                <p className="text-sm text-gray-600">Type: {bill.bill_type}</p>
                <p className="text-sm text-gray-600">
                  Amount: {bill.amount} BDT
                </p>
                <p className="text-sm text-gray-600">Due: {bill.due_date}</p>
              </div>
              <button
                onClick={() => handlePay(bill)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white ${
                  isPaid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isPaid}
              >
                {isPaid ? "Paid" : "See Details"}
                {isPaid && <span className="text-xl">✅</span>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bills;
