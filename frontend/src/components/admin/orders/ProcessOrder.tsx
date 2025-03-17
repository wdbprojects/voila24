import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMyOrderDetailsQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { toast } from "sonner";
import Loader from "@/components/comps/Loader";
import { capitalize, formatPrice } from "@/utils/Misc";
import OrderItems from "@/components/orders/OrderItems";
import BreadcrumbsAdminOrders from "@/components/admin/orders/BreadcrumbsAdminOrders";

const statusColorMap: Record<string, ChipProps["color"]> = {
  REJECTED: "danger",
  RETURNED: "warning",
  processing: "danger",
  shipped: "warning",
  delivered: "success",
  paid: "success",
};

const ProcessOrder = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const params = useParams();
  const { data, isLoading, error } = useMyOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  /* UPDATE ORDER */
  const [
    updateOrderStatus,
    {
      error: updateStatusError,
      isSuccess: updateStatusSuccess,
      isLoading: updateStatusIsLoading,
    },
  ] = useUpdateOrderStatusMutation();

  const handleUpdateState = async (id) => {
    const data = { orderStatus };
    try {
      await updateOrderStatus({ id: id, body: data });
    } catch (err) {
      console.log(`Try/catch error: ${err}`);
    }
  };

  useEffect(() => {
    if (order?.orderStatus) {
      setOrderStatus(order?.orderStatus?.toLowerCase());
    }
  }, [order?.orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (updateStatusError) {
      toast.error(updateStatusError?.data?.message);
    }
    if (updateStatusSuccess) {
      toast.success("Status updated successfully");
    }
  }, [error, updateStatusError, updateStatusSuccess]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container py-4 px-8">
      <BreadcrumbsAdminOrders orderNumber={order?._id} />
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
          {/* ADDRESS INFO */}
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
          {/* ORDER INFO */}
          <div className="p-1">
            <h3 className="font-semibold mb-2">Order Info</h3>
            <p className="text-sm">
              Method: {capitalize(order?.paymentMethod)}
            </p>
            <p className="text-sm">Stripe Id: {order?.paymentInfo?.id}</p>
            <Divider className="my-2" />
            <div className="text-sm flex gap-2 mb-2 mt-4">
              <span>Order Status:</span>
              <Chip
                className="capitalize"
                color={statusColorMap[order.orderStatus]}
                size="sm"
                variant="flat"
              >
                {order?.orderStatus}
              </Chip>
            </div>
            <div className="text-sm flex gap-2">
              <span>Payment Status:</span>
              <Chip
                className="capitalize"
                color={statusColorMap[order?.paymentInfo?.status]}
                size="sm"
                variant="flat"
              >
                {order?.paymentInfo?.status}
              </Chip>
            </div>
            <Divider className="mt-4" />
            {/* SELECT STATUS */}
            <div className="w-full mt-8 block">
              <Select
                size="sm"
                label="Select a status"
                className="max-w-xs mb-2"
                labelPlacement="outside"
                selectedKeys={[orderStatus]}
                onChange={(event) => {
                  setOrderStatus(event.target.value);
                }}
              >
                <SelectItem key="processing" value="processing">
                  Processing
                </SelectItem>
                <SelectItem key="shipped" value="shipped">
                  Shipped
                </SelectItem>
                <SelectItem key="delivered" value="delivered">
                  Delivered
                </SelectItem>
              </Select>
              <Button
                variant="flat"
                color="primary"
                size="sm"
                className="w-full"
                isLoading={updateStatusIsLoading ? true : false}
                isDisabled={updateStatusIsLoading ? true : false}
                onClick={() => {
                  handleUpdateState(order?._id);
                }}
              >
                {isLoading ? "Saving data" : "Update Status"}
              </Button>
            </div>
          </div>
          {/* ORDER SUMMARY */}
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

export default ProcessOrder;
