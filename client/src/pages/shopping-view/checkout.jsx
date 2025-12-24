
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL, isLoading } = useSelector(
    (state) => state.shoppingOrder
  );

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems?.items?.reduce(
      (sum, item) =>
        sum +
        (item.SalePrice > 0 ? item.SalePrice : item.price) * item.quantity,
      0
    ) || 0;

  const handleStripeCheckout = () => {
    if (!cartItems?.items?.length) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }

    if (!currentSelectedAddress) {
      toast({ title: "Please select an address", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.SalePrice > 0 ? item.SalePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: currentSelectedAddress,
      orderStatus: "pending",
      paymentMethod: "stripe",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((res) => {
      if (res?.payload?.checkoutURL) {
        window.location.href = res.payload.checkoutURL;
      } else {
        toast({ title: "Stripe checkout failed", variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div className="flex flex-col gap-4">
          {cartItems?.items?.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))}

          <div className="mt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalCartAmount}</span>
          </div>

            <Button
              className="w-full mt-4"
              onClick={handleStripeCheckout}
              disabled={
                isLoading || !currentSelectedAddress || !cartItems?.items?.length
              }
            >
              {isLoading ? "Processing..." : "Checkout with Stripe"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  export default ShoppingCheckout;
