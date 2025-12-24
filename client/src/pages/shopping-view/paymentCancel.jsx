

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MdCancel } from "react-icons/md"; // React Icons

function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 px-4">
      <div className="text-center max-w-sm w-full bg-white shadow-md rounded-xl p-8">
        <div className="mb-6">
          <MdCancel className="w-16 h-16 mx-auto text-red-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made, and your order was
          not processed.
        </p>
        <Button
          onClick={() => navigate("/shop/home")}
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Back to Shopping
        </Button>
      </div>
    </div>
  );
}

export default PaymentCancelPage;
