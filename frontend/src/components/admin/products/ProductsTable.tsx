import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { statusOptions, prodColumns } from "@/data/tableData";
import { capitalize, formatPrice } from "@/utils/Misc";
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
import { ChevronDown, ImagePlus, Pencil, Search, Trash2 } from "lucide-react";

import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "@/redux/api/productsApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";

const statusColorMap: Record<string, ChipProps["color"]> = {
  PAID: "success",
  REJECTED: "danger",
  RETURNED: "warning",
  PROCESSING: "warning",
  COMPLETED: "success",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "category",
  "price",
  "stock",
  "seller",
  "orderStatus",
  "actions",
];

const ProductsTable = () => {
  const { data, error } = useGetAdminProductsQuery();
  const [
    deleteProduct,
    {
      error: deleteProductError,
      isLoading: isDeleteLoading,
      isSuccess: deleteProductSuccess,
    },
  ] = useDeleteProductMutation();

  /* LOCAL STATE */
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get("order_success");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = data?.products?.map((product) => {
    return {
      id: product?._id,
      name: product?.name,
      price: formatPrice(product?.price),
      category: product?.category,
      seller: product?.seller,
      stock: product?.stock,
      image: product?.images[0]?.url,
    };
  });
  type Product = typeof products;

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns2;
    return prodColumns.filter((column) => {
      return Array.from(visibleColumns).includes(column.uid);
    });
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProducts = products ? [...products] : [];
    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.id.toLowerCase().includes(filterValue.toLowerCase());
      });
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length === statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        Array.from(statusFilter).includes(product.paymentStatus);
      });
    }
    return filteredProducts;
  }, [products, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor.column as keyof Product] as number;
      const second = b[sortDescriptor.column as keyof Product] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      console.log(`Error from try/catch: ${err}`);
    }
  };

  const renderCell = useCallback((product, columnKey: React.Key) => {
    const cellValue = product[columnKey];
    switch (columnKey) {
      case "paymentStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[product.paymentStatus]}
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
            color={statusColorMap[product.orderStatus]}
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
                <Link to={`/admin/products/${product?.id}`}>
                  <Pencil size={20} color="#999999" />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip
              placement="top"
              content="Upload images"
              color="success"
              size="sm"
              radius="sm"
            >
              <Button isIconOnly size="md" variant="light" color="success">
                <Link to={`/admin/products/${product?.id}/upload_images`}>
                  <ImagePlus size={20} color="#999999" />
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
                isIconOnly
                size="md"
                variant="light"
                color="danger"
                onClick={() => {
                  handleDeleteProduct(product?.id);
                }}
                disabled={isDeleteLoading}
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
                {prodColumns.map((column) => {
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
            Total products:{" "}
            <span className="font-semibold dark:text-neutral-300">
              {products?.length}
            </span>
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
    products?.length,
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
    if (deleteProductError) {
      toast.error(deleteProductError?.data?.message);
    }
    if (deleteProductSuccess) {
      toast.success("Product deleted successfully");
      navigate("/admin/products");
    }
  }, [error, deleteProductError, deleteProductSuccess]);

  return (
    <Table
      aria-label="Products table with pagination"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: "h-auto" }}
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
      <TableBody emptyContent={"No products found"} items={sortedItems}>
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

export default ProductsTable;
