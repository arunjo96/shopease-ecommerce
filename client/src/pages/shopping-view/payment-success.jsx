

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";
import { clearCart, fetchCartItems } from "@/store/shop/cart-slice";

import { CheckCircle, Loader2 } from "lucide-react";
function PaymentSuccessPage() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth); 
  const [status, setStatus] = useState("processing"); // processing | success | error

 
  // useEffect(() => {
  //   const session_id = params.get("session_id");
  //   const orderId = params.get("orderId");

  //   if (!session_id || !orderId) {
  //     navigate("/shop");
  //     return;
  //   }

  //   dispatch(capturePayment({ session_id, orderId }))
  //     .unwrap()
  //     .then(() => {
  //       if (user?.id) dispatch(fetchCartItems(user.id)); // fetch latest cart
  //       dispatch(clearCart());
  //       setStatus("success");

  //       setTimeout(() => navigate("/shop/account?tab=orders"), 3000);
  //     })
  //     .catch(() => {
  //       setStatus("error");
  //       navigate("/shop/payment-cancel");
  //     });
  // }, [dispatch, navigate, params, user?.id]);

  useEffect(() => {
    const session_id = params.get("session_id");
    const orderId = params.get("orderId");

    if (!session_id || !orderId) {
      navigate("/shop/home");
      return;
    }

    const handlePayment = async () => {
      try {
        await dispatch(capturePayment({ session_id, orderId })).unwrap();

        if (user?.id) {
          await dispatch(fetchCartItems(user.id)).unwrap();
        }

        dispatch(clearCart());
        setStatus("success");

        setTimeout(() => navigate("/shop/home"), 3000);
      } catch (err) {
        setStatus("error");
        navigate("/shop/payment-cancel");
      }
    };

    handlePayment();
  }, [dispatch, navigate, params, user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {status === "processing" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Processing Payment…</h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your payment
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-green-600">
              Payment Successful 🎉
            </h2>
            <p className="text-gray-500 mt-2">
              Your order has been placed successfully.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Redirecting to your orders…
            </p>

            <button
              onClick={() => navigate("/shop/home")}
              className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              View My Orders
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
