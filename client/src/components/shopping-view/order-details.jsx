
  import { useSelector } from "react-redux";
  import { Badge } from "../ui/badge";
  import { DialogContent } from "../ui/dialog";
  import { Label } from "../ui/label";
  import { Separator } from "../ui/separator";

  function ShoppingOrderDetailsView({ orderDetails }) {
    const { user } = useSelector((state) => state.auth);

    if (!orderDetails) return null;

    return (
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <div className="grid gap-6 p-4">
          {/* ===== ORDER INFO ===== */}
          <div className="grid gap-4">
            <h2 className="text-lg font-bold">Order Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="font-medium text-sm text-gray-600">Order ID</p>
                <p className="text-sm">{orderDetails._id}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-medium text-sm text-gray-600">Order Date</p>
                <p className="text-sm">
                  {orderDetails.orderDate
                    ? new Date(orderDetails.orderDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="font-medium text-sm text-gray-600">
                  Payment Method
                </p>
                <p className="text-sm capitalize">
                  {orderDetails.paymentMethod}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="font-medium text-sm text-gray-600">
                  Payment Status
                </p>
                <Badge
                  className={`w-fit py-1 px-2 text-xs ${
                    orderDetails.paymentStatus === "paid"
                      ? "bg-green-500"
                      : orderDetails.paymentStatus === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
                >
                  {orderDetails.paymentStatus}
                </Badge>
              </div>

              <div className="flex flex-col">
                <p className="font-medium text-sm text-gray-600">
                  Order Status
                </p>
                <Badge
                  className={`w-fit py-1 px-2 text-xs ${
                    orderDetails.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderDetails.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderDetails.orderStatus}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* ===== ORDER ITEMS/PRODUCTS ===== */}
          <div className="grid gap-4">
            <h3 className="font-bold text-base">Order Items</h3>

            {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
              <div className="space-y-3">
                {orderDetails.cartItems.map((item, index) => (
                  <div
                    key={item.productId || index}
                    className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {/* Product Image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Price: ₹{item.price}
                      </p>
                      <p className="text-xs text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total Amount */}
                <div className="flex justify-end pt-2 border-t border-gray-200">
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Total Amount:</p>
                    <p className="font-bold text-lg">
                      ₹{orderDetails.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 text-sm">
                No items found
              </p>
            )}
          </div>

          <Separator />

          {/* ===== SHIPPING INFO ===== */}
          <div className="grid gap-4">
            <h3 className="font-bold text-base">Shipping Information</h3>

            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-gray-600">Name</p>
                <p>{user?.userName || "N/A"}</p>
              </div>

              <div>
                <p className="font-medium text-gray-600">Address</p>
                <p>{orderDetails.addressInfo?.address || "N/A"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">City</p>
                  <p>{orderDetails.addressInfo?.city || "N/A"}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Pincode</p>
                  <p>{orderDetails.addressInfo?.pincode || "N/A"}</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-600">Phone</p>
                <p>{orderDetails.addressInfo?.phone || "N/A"}</p>
              </div>

              {orderDetails.addressInfo?.notes && (
                <div>
                  <p className="font-medium text-gray-600">Notes</p>
                  <p className="text-gray-600">
                    {orderDetails.addressInfo.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }

  export default ShoppingOrderDetailsView;
