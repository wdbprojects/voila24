import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { formatPrice } from "@/utils/Misc";

const TotalsTable = () => {
  const { numItemsInCart, cartTotal, shippingCost, tax, orderTotal } =
    useSelector((state) => {
      return state.cartState;
    });

  return (
    <Table
      removeWrapper
      isCompact
      fullWidth
      hideHeader
      aria-label="Summary totals table"
    >
      <TableHeader>
        <TableColumn>Description</TableColumn>
        <TableColumn>Amount US$</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell className="pl-0 dark:text-neutral-300">
            Subtotal{" "}
            <span className="font-semibold">
              ({numItemsInCart} {numItemsInCart === 1 ? "item" : "items"})
            </span>
            :
          </TableCell>
          <TableCell className="dark:text-neutral-300 text-right">
            {formatPrice(cartTotal)}
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell className="pl-0 dark:text-neutral-300">
            Shipping & handling:
          </TableCell>
          <TableCell className="dark:text-neutral-300 text-right">
            {formatPrice(shippingCost)}
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell className="pl-0 dark:text-neutral-300">
            Estimated TAX:
          </TableCell>
          <TableCell className="dark:text-neutral-300 text-right">
            {formatPrice(tax)}
          </TableCell>
        </TableRow>

        <TableRow key="4">
          <TableCell className="pl-0 font-semibold dark:text-neutral-300">
            Total:
          </TableCell>
          <TableCell className="border-t font-semibold dark:text-neutral-300 text-right">
            {formatPrice(orderTotal)}
          </TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell className="pl-0 dark:text-neutral-300">
            Gift Card:
          </TableCell>
          <TableCell className="dark:text-neutral-300 text-right">
            -$0.00
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TotalsTable;
