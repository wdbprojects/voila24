import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { statusOptions, columns2 } from "@/data/tableData";
import { capitalize, formatPrice } from "@/utils/Misc";
import moment from "moment";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { ChevronDown, Pencil, Search, Trash2 } from "lucide-react";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "@/redux/api/orderApi";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cartSlice";

const statusColorMap: Record<string, ChipProps["color"]> = {
  PAID: "success",
  REJECTED: "danger",
  RETURNED: "warning",
  PROCESSING: "danger",
  SHIPPED: "warning",
  DELIVERED: "success",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  /* "email", */
  "totalAmount",
  "orderDate",
  /* "city", */
  "paymentStatus",
  "orderStatus",
  "actions",
];

const AdminOrdersTable = () => {
  const { data, error } = useGetAdminOrdersQuery();
  const [
    deleteOrder,
    {
      error: deleteOrderError,
      isSuccess: deleteOrderSuccess,
      isLoading: deleteOrderIsLoading,
    },
  ] = useDeleteOrderMutation();
  /* LOCAL STATE */
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [searchParams] = useSearchParams();

  const orders = data?.orders?.map((order) => {
    const orderDate = moment(order?.createdAt);
    return {
      id: order?._id,
      email: order?.user?.email,
      totalAmount: formatPrice(order?.totalAmount),
      orderDate: orderDate.format("DD/MM/YYYY [at] h:mm A"),
      city: order?.shippingInfo?.city,
      paymentStatus: order?.paymentInfo?.status.toUpperCase(),
      orderStatus: order?.orderStatus.toUpperCase(),
    };
  });
  type Order = typeof orders;

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns2;
    return columns2.filter((column) => {
      return Array.from(visibleColumns).includes(column.uid);
    });
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = orders ? [...orders] : [];
    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.id.toLowerCase().includes(filterValue.toLowerCase());
      });
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length === statusOptions.length
    ) {
      filteredOrders = filteredOrders.filter((order) => {
        Array.from(statusFilter).includes(order.paymentStatus);
      });
    }
    return filteredOrders;
  }, [orders, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleDeleteOrder = async (id) => {
    console.log(id);

    await deleteOrder(id);
  };

  const renderCell = useCallback((order, columnKey: React.Key) => {
    const cellValue = order[columnKey];
    switch (columnKey) {
      case "paymentStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[order.paymentStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "orderStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[order.orderStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Tooltip
              placement="top"
              content="Edit product"
              color="warning"
              size="sm"
              radius="sm"
            >
              <Button isIconOnly size="md" variant="light" color="warning">
                <Link to={`/admin/orders/${order?.id}`}>
                  <Pencil size={20} color="#999999" />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip
              placement="top"
              content="Delete product"
              color="danger"
              size="sm"
              radius="sm"
            >
              <Button
                //isIconOnly
                size="md"
                variant="light"
                color="danger"
                isLoading={deleteOrderIsLoading ? true : false}
                isDisabled={deleteOrderIsLoading ? true : false}
                onClick={() => {
                  handleDeleteOrder(order?.id);
                }}
              >
                <Trash2 size={20} color="#999999" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(Number(event?.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            size="sm"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by ID"
            startContent={<Search />}
            value={filterValue}
            onClear={() => {
              onClear();
            }}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Order Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => {
                  return (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDown />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns2.map((column) => {
                  return (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-500 text-base tracking-wide">
            Total orders:{" "}
            <span className="font-semibold">{orders?.length}</span>
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    orders?.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <span className="w-[30%] text-small text-default-400"></span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteOrderSuccess) {
      toast.success("Order deleted successfully");
    }
    if (deleteOrderError) {
      toast.error(deleteOrderError.data?.message);
    }
  }, [error, deleteOrderSuccess, deleteOrderError]);

  return (
    <Table
      aria-label="Orders table with pagination"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: "max-h-[382px]" }}
      //selectedKeys={selectedKeys}
      //selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => {
          return (
            <TableColumn
              key={column.uid}
              align={
                column.uid === "actions"
                  ? "center"
                  : column.uid === "totalAmount"
                  ? "end"
                  : "start"
              }
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          );
        }}
      </TableHeader>
      <TableBody emptyContent={"No orders found"} items={sortedItems}>
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default AdminOrdersTable;
