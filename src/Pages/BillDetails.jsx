import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import billsData from "../../public/billData.json";
import { AuthContext } from "../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { balance, setBalance, user } = useContext(AuthContext);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  const bill = billsData.find((b) => b.id === parseInt(id));
  const paidBillsKey = `paidBills_${user?.uid || "guest"}`;

  // Example bank cards - you can replace with real data/fetch later
  const bankCards = [
    { id: "card1", name: "Visa **** 1234" },
    { id: "card2", name: "MasterCard **** 5678" },
    { id: "card3", name: "Amex **** 9012" },
  ];

  useEffect(() => {
    if (bill) {
      const paidBills = JSON.parse(localStorage.getItem(paidBillsKey)) || [];
      setAlreadyPaid(paidBills.includes(bill.id));
    }
  }, [bill, paidBillsKey]);

  if (!bill)
    return (
      <p className="text-center text-red-500 text-lg mt-10">Bill not found</p>
    );

  const handlePay = () => {
    if (!selectedCard) {
      toast.error("Please select a bank card to proceed.");
      return;
    }

    if (alreadyPaid) {
      toast.warn("You've already paid this bill!");
      return;
    }

    if (balance < bill.amount) {
      toast.error("Insufficient balance to pay this bill!");
      return;
    }

    setBalance((prev) => prev - bill.amount);

    const paidBills = JSON.parse(localStorage.getItem(paidBillsKey)) || [];
    if (!paidBills.includes(bill.id)) {
      paidBills.push(bill.id);
      localStorage.setItem(paidBillsKey, JSON.stringify(paidBills));
    }

    setAlreadyPaid(true);

    toast.success(
      `Successfully paid ${bill.amount} BDT for ${bill.organization} using ${selectedCard}`
    );

    setTimeout(() => {
      navigate("/bills");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Icon/Preview */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full lg:w-1/3">
          <img src={bill.icon} alt={bill.bill_type} className="w-24 h-24 mb-4" />
          <span className="text-gray-400 text-sm mt-auto">
            <img
              src={bill.icon}
              alt={`${bill.bill_type} icon`}
              className="w-8 h-8"
            />
          </span>
        </div>

        {/* Right side - Info + Card select + Buttons */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{bill.organization}</h2>
          <p className="mb-2 text-sm md:text-base">
            <strong>Bill Type:</strong> {bill.bill_type}
          </p>
          <p className="mb-2 text-sm md:text-base">
            <strong>Amount:</strong> {bill.amount} BDT
          </p>
          <p className="mb-2 text-sm md:text-base">
            <strong>Due Date:</strong> {bill.due_date}
          </p>
          <p className="mb-6 text-sm md:text-base">
            <strong>Your Balance:</strong> {balance} BDT
          </p>

          {/* Bank Card Selection */}
          <div className="mb-6">
            <label htmlFor="bankCard" className="block font-semibold mb-2">
              Select Bank Card:
            </label>
            <select
              id="bankCard"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="input input-bordered w-full"
              disabled={alreadyPaid}
            >
              <option value="">-- Choose a card --</option>
              {bankCards.map((card) => (
                <option key={card.id} value={card.name}>
                  {card.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePay}
              disabled={alreadyPaid}
              className={`px-6 py-3 rounded text-white w-full sm:w-auto ${
                alreadyPaid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {alreadyPaid ? "Already Paid" : "Pay Bill"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 w-full sm:w-auto"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default BillDetails;
