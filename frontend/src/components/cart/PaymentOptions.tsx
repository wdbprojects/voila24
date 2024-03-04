import { useState } from "react";
import { Divider, RadioGroup } from "@nextui-org/react";
import CustomRadio from "@/components/comps/CustomRadio";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "@/redux/features/checkoutSlice";

const PaymentOptions = () => {
  const [method, setMethod] = useState("");
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => {
    return state.checkout;
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (method === "credit") {
      // CREATE STRIPE ORDER
    } else if (method === "paypal") {
      // CREATE PAYPAL ORDER
    } else if (method === "cash") {
      // CREATE CASH ORDER
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <div className="block w-full">
        <h2 className="font-medium">Credit / Debit Cards</h2>
        <Divider className="my-2 block" />
        <form onSubmit={handleOnSubmit}>
          <RadioGroup
            //label="plans"
            description="Selected plan can be changed at any time."
            defaultValue={paymentMethod}
          >
            <CustomRadio
              description="All credit and debit card payments handled by STRIPE"
              selected
              value="credit"
              onChange={() => {
                setMethod("credit");
                dispatch(savePaymentMethod("credit"));
              }}
            >
              Credit or Debit Card
            </CustomRadio>
            <CustomRadio
              description="Login or register a new PayPal account"
              value="paypal"
              onChange={() => {
                setMethod("paypal");
                dispatch(savePaymentMethod("paypal"));
              }}
            >
              PayPal
            </CustomRadio>
            <CustomRadio
              description="Pay in cash when you receive the products"
              value="cash"
              onChange={() => {
                setMethod("cash");
                dispatch(savePaymentMethod("cash"));
              }}
            >
              Cash on delivery
            </CustomRadio>
          </RadioGroup>
        </form>
      </div>
    </div>
  );
};

export default PaymentOptions;
