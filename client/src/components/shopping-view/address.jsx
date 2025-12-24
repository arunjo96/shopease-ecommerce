
import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user]);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      toast({ title: "You can add max 3 addresses", variant: "destructive" });
      return;
    }

    const action =
      currentEditedId !== null
        ? editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        : addNewAddress({ ...formData, userId: user?.id });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: currentEditedId ? "Address updated" : "Address added",
        });

        
        setCurrentSelectedAddress({
          ...formData,
          _id: currentEditedId || data.payload.addressId,
        });

        setFormData(initialAddressFormData);
        setCurrentEditedId(null);
      }
    });
  }

  function handleDeleteAddress(address) {
    dispatch(deleteAddress({ userId: user?.id, addressId: address._id })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          toast({ title: "Address deleted successfully" });
        }
      }
    );
  }

  function handleEditAddress(address) {
    setCurrentEditedId(address._id);
    setFormData({ ...address });
  }

  // function isFormValid() {
  //   return Object.values(formData).every((val) => val.trim() !== "");
  // }

  function isFormValid() {
    return (
      formData.address?.trim() &&
      formData.city?.trim() &&
      formData.phone?.trim() &&
      formData.pincode?.toString().trim() &&
      formData.notes?.trim()
    );
  }


  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList?.map((item) => (
          <AddressCard
            key={item._id}
            selectedId={selectedId}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            addressInfo={item}
          />
        ))}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
