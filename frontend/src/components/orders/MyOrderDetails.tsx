import { useParams } from "react-router-dom";
import { useMyOrderDetailsQuery } from "@/redux/api/orderApi";
import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { toast } from "sonner";
import Loader from "../comps/Loader";
import { capitalize, formatPrice } from "@/utils/Misc";
import OrderItems from "./OrderItems";
import BreadcrumbsOrders from "@/components/orders/BreadcrumbsOrders";

const MyOrderDetails = () => {
  const params = useParams();

  const { data, isLoading, error } = useMyOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container py-4 px-8">
      <BreadcrumbsOrders orderNumber={order?._id} />
      <Card radius="none" className="w-full rounded-[4px] px-4 py-2 mt-2">
        <CardHeader className="flex flex-col items-start">
          <h3 className="text-lg text-center w-full mb-4 font-bold">
            Order Details
          </h3>
          <div className="flex h-5 items-center space-x-4 text-small">
            <div>
              Order No. <span className="font-bold">{order?._id}</span>
            </div>
            <Divider orientation="vertical" />
            <div>Ordered on October 21, 2020</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-1">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm">Name: {order?.shippingInfo?.fullName}</p>
            <p className="text-sm">Address: {order?.shippingInfo?.address1}</p>
            {order?.shippingInfo?.address2 && (
              <p className="text-sm">
                Address cont.: {order?.shippingInfo?.address2}
              </p>
            )}
            <p className="text-sm">City: {order?.shippingInfo?.city}</p>
            <p className="text-sm">
              Country: {order?.shippingInfo?.countryName}
            </p>
            <Divider className="my-2" />
            <p className="text-sm">Phone: {order?.shippingInfo?.phoneNumber}</p>
          </div>
          <div className="p-1">
            <h3 className="font-semibold mb-2">Order Info</h3>
            <p className="text-sm">
              Method: {capitalize(order?.paymentMethod)}
            </p>
            <p className="text-sm">Stripe Id: {order?.paymentInfo?.id}</p>
            <p className="text-sm">Order Status: {order?.orderStatus}</p>
            <p className="text-sm">
              Payment Status: {capitalize(order?.paymentInfo?.status)}
            </p>
          </div>
          <div className="p-1">
            <h3 className="font-semibold mb-2">Order Summary</h3>

            <p className="flex justify-between text-sm">
              <span>Item(s) Subtotal:</span>{" "}
              <span>{formatPrice(order?.itemsPrice)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Shipping:</span>{" "}
              <span>{formatPrice(order?.shippingAmount)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Discounts:</span>{" "}
              <span>{formatPrice(order?.discounts || 0)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Total before tax:</span>{" "}
              <span>
                {formatPrice(order?.itemsPrice + order?.shippingAmount)}
              </span>
            </p>

            <p className="flex justify-between text-sm">
              <span>Tax collected:</span>{" "}
              <span>{formatPrice(order?.taxAmount)}</span>
            </p>
            <Divider className="my-2" />
            <p className="flex justify-between text-sm font-bold mt-2">
              <span>Grand Total:</span>{" "}
              <span>{formatPrice(order?.totalAmount)}</span>
            </p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="mt-2 flex flex-col">
          <h3 className="text-lg text-center w-full mb-4 font-bold">
            Order List
          </h3>
          <OrderItems orderId={params?.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyOrderDetails;
