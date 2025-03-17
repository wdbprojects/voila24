import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import AddAddress from "./AddAddress";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

import TotalsTable from "./TotalsTable";
import CheckoutItems from "./CheckoutItems";
import { formatPrice } from "@/utils/Misc";
import PaymentOptions from "./PaymentOptions";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "@/redux/api/orderApi";
import { toast } from "sonner";

const Checkout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, paymentMethod } = useSelector((state) => {
    return state.checkout;
  });

  const { cartItems, cartTotal, orderTotal, shippingCost, tax } = useSelector(
    (state) => {
      return state.cartState;
    },
  );

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const [stripeCheckoutSession, { data: checkoutData, error: checkoutError }] =
    useStripeCheckoutSessionMutation();

  const { fullName, phoneNumber, address1, address2, city, countryName } =
    shippingInfo;

  const [value, setValue] = useState(
    !fullName && !address1 ? "item-1" : "item-3",
  );

  const orderData = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemsPrice: cartTotal,
    shippingAmount: shippingCost,
    taxAmount: tax,
    totalAmount: orderTotal,
    paymentInfo: {
      status: "Not Paid",
    },
    paymentMethod: paymentMethod,
  };

  const stripeData = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemsPrice: cartTotal,
    shippingAmount: shippingCost,
    taxAmount: tax,
    totalAmount: orderTotal,
  };

  const handleSubmitOrder = () => {
    //createNewOrder(orderData);
    stripeCheckoutSession(stripeData);
  };

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }
    if (checkoutError) {
      toast.error(`Error: ${checkoutError?.data?.message}`);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order placed successfully");
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  return (
    <div className="container xs:mt-2 sm:mt-4 md:mt-8 p-0 xs:px-2 sm:px-4 md:px-8">
      {/* INNER CONTAINER */}
      <div className="grid grid-cols-12 gap-8">
        {/* CHECKOUT INFO */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-zinc-950 rounded-sm sm:pl-4 sm:pr-6 pt-4 px-4 pb-4">
          <Accordion
            type-="single"
            defaultValue={value}
            collapsible
            className="w-full px-8"
            value={value}
            onValueChange={setValue}
          >
            {/* 1. SHIPPING ADDRESS */}
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="text-lg hover:no-underline"
                onClick={() => {
                  setValue("item-1");
                }}
              >
                <div className="w-full grid grid-cols-4 items-start justify-start">
                  <div className="col-span-2 text-left pt-0 mt-0">
                    1. Shipping address
                  </div>
                  <div className="mt-1 col-span-2 text-left text-sm font-light leading-4">
                    <p>{fullName}</p>
                    <p>
                      {address1} {address2 ? address2 : ""}
                    </p>
                    <p>
                      {city}
                      {!fullName && !address1 ? "" : ", "} {countryName}
                    </p>
                    <p className="text-sm leading-tight mt-1 text-left">
                      <span
                        onClick={() => {
                          setValue("item-1");
                        }}
                        className="text-teal-700 font-semibold hover:text-teal-600 transition hover:underline"
                      >
                        {value === "item-1" ? "Close" : "Update address"}
                      </span>
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="">
                <div className="">
                  {Object.keys(shippingInfo).length > 0 && (
                    <Card className="w-full mb-4" radius="sm">
                      <CardHeader>
                        <h3>Your current address</h3>
                      </CardHeader>
                      <Divider />
                      <CardBody>
                        <p className="text-md">{fullName}</p>
                        <p className="text-small text-default-500">
                          {address1}
                        </p>
                        {address2 && (
                          <p className="text-small text-default-500">
                            {address2}
                          </p>
                        )}
                        <p className="text-small text-default-500">
                          {city} - {countryName}
                        </p>
                        <Divider className="mt-[8px] mb-[4px]" />
                        <p className="text-small text-default-500">
                          Phone number: {phoneNumber}
                        </p>
                      </CardBody>
                    </Card>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="solid"
                      size="sm"
                      color="primary"
                      className="text-neutral-900 font-medium"
                      onPress={() => {
                        handleOpen();
                      }}
                    >
                      {Object.keys(shippingInfo).length === 0
                        ? "Add new address"
                        : "Edit shipping address"}
                    </Button>
                  </div>
                  <Modal
                    size="md"
                    isOpen={isOpen}
                    onClose={onClose}
                    isDismissable={false}
                  >
                    <ModalContent>
                      {(onClose) => {
                        return (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Your address
                            </ModalHeader>
                            <ModalBody>
                              <AddAddress onClose={onClose} />
                            </ModalBody>
                          </>
                        );
                      }}
                    </ModalContent>
                  </Modal>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* 2. PAYMENT METHOD */}
            <AccordionItem value="item-2">
              <AccordionTrigger
                className="text-lg hover:no-underline"
                onClick={() => {
                  setValue("item-2");
                }}
              >
                <div className="w-full grid grid-cols-4 items-start justify-start">
                  <div className="col-span-2 text-left pt-0 mt-0">
                    2. Payment method
                  </div>
                  <div className="mt-1 col-span-2 text-left text-sm font-light leading-5">
                    {paymentMethod === "credit" ? (
                      <p>
                        Your current payment method is{" "}
                        <span className="font-semibold">STRIPE</span>
                      </p>
                    ) : paymentMethod === "paypal" ? (
                      <p>
                        Your current payment method is{" "}
                        <span className="font-semibold">PAYPAL</span>
                      </p>
                    ) : paymentMethod === "cash" ? (
                      <p>
                        Your current payment method is{" "}
                        <span className="font-semibold">CASH on delivery</span>
                      </p>
                    ) : (
                      <p>Select your payment method</p>
                    )}

                    <p className="text-sm leading-tight mt-1 text-left">
                      <span
                        onClick={() => {
                          setValue("item-2");
                        }}
                        className="text-teal-700 font-semibold hover:text-teal-600 transition hover:underline"
                      >
                        {value === "item-2" ? "Close" : "Change payment method"}
                      </span>
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="w-full mb-4" radius="sm">
                  <CardBody>
                    <PaymentOptions />
                  </CardBody>
                </Card>
              </AccordionContent>
            </AccordionItem>
            {/* 3. ITEMS AND SHIPPING */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg hover:no-underline">
                <div className="w-full grid grid-cols-4 items-start justify-start">
                  <div className="col-span-2 text-left pt-0 mt-0">
                    3. Items and shipping
                  </div>
                  <p className="text-sm leading-tight mt-1 text-left">
                    <span
                      onClick={() => {
                        setValue("item-3");
                      }}
                      className="text-teal-700 font-semibold hover:text-teal-600 transition hover:underline"
                    >
                      {value === "item-3" ? "Close" : "Review order"}
                    </span>
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-red-500">
                <div>
                  <Card
                    className="w-full mb-4 px-4 bg-neutral-100 dark:bg-neutral-900"
                    radius="sm"
                  >
                    <CardHeader className="mx-0 px-0">
                      <h3 className="font-semibold">
                        Items description and shipping information
                      </h3>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <CheckoutItems />
                    </CardBody>
                  </Card>
                  {/* CALL TO ACTION */}
                  <div className="px-4 flex gap-8 items-center border rounded-sm pt-1 pb-2">
                    <Button
                      color="primary"
                      size="sm"
                      className="text-neutral-900 font-semibold max-w-[200px]"
                      fullWidth
                      //onClick={handleSubmitOrder}
                    >
                      Place your order in US$
                    </Button>
                    <div>
                      <div className="text-xl font-bold text-red-700 dark:text-red-700">
                        <span>Payment total:</span>&nbsp;&nbsp;
                        <span>{formatPrice(orderTotal)}</span>
                      </div>
                      <p className="text-xs leading-tight mt-1 text-left">
                        By placing your order, you agree to Voila's{" "}
                        <Link
                          to="#"
                          className="text-teal-700 font-semibold hover:text-teal-600 transition"
                        >
                          terms and conditions.
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* ORDER SUMMARY */}
        <div className="col-span-12 lg:col-span-4 border rounded p-4">
          {/* CALL TO ACTION */}
          <div className="px-4">
            <Button
              color="primary"
              size="sm"
              className="text-neutral-900 font-semibold"
              fullWidth
              isLoading={isLoading ? true : false}
              isDisabled={isLoading ? true : false}
              onClick={handleSubmitOrder}
            >
              {isLoading ? "Processing..." : "Place your order in US$"}
            </Button>
            <p className="text-xs leading-tight mt-1 text-center px-8">
              By placing your order, you agree to Voila's{" "}
              <Link
                to="#"
                className="text-teal-700 font-semibold hover:text-teal-600 transition"
              >
                terms and conditions.
              </Link>
            </p>
          </div>
          <Divider className="my-2" />
          {/* TOTALS */}
          <div className="px-4">
            <h2 className="font-semibold text-lg mb-2">Order Totals</h2>
            <TotalsTable />
            <Divider className="my-4" />
            <div className="flex justify-between items-center text-xl font-bold text-red-700 dark:text-red-700">
              <span>Order total:</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
            <Divider className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
