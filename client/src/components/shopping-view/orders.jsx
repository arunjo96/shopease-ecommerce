

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
 const [selectedOrderId, setSelectedOrderId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const { orderList = [], orderDetails } = useSelector(
    (state) => state.shoppingOrder || {}
  );

  
  function handleFetchOrderDetails(orderId) {
    setSelectedOrderId(orderId);
    dispatch(getOrderDetails(orderId));
  }
  
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]); 
  

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
      
        {!Array.isArray(orderList) || orderList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No orders found.</p>
            {user?.id && <p className="text-xs mt-2">User ID: {user.id}</p>}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell className="text-sm">{orderItem._id}</TableCell>
                  <TableCell>
                    {new Date(orderItem.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{orderItem.totalAmount}</TableCell>
                  <TableCell>
                  
                    <Dialog
                      open={selectedOrderId === orderItem._id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setSelectedOrderId(null);
                          dispatch(resetOrderDetails());
                        }
                      }}
                    >
                      <Button
                        size="sm"
                        onClick={() => handleFetchOrderDetails(orderItem._id)}
                      >
                        View Details
                      </Button>
                      {orderDetails && (
                        <ShoppingOrderDetailsView
                          orderDetails={{
                            ...orderDetails,
                            cartItems: orderDetails.cartItems || [],
                          }}
                        />
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
