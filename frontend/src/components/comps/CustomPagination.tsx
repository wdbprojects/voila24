import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "@nextui-org/react";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const totalPages = Math.ceil(filteredProductsCount / resPerPage);

  const page = Number(searchParams.get("page")) || 1;
  const setCurrentPageNumber = (page: number) => {
    setCurrentPage(page);
    if (searchParams.has("page")) {
      searchParams.set("page", page);
    } else {
      searchParams.append("page", page);
    }

    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div className="flex justify-center">
      {filteredProductsCount > resPerPage && (
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 items-center">
            <Pagination
              classNames={{
                wrapper:
                  "gap-0 overflow-visible h-8 rounded border border-divider",
                item: "w-8 h-8 text-small rounded-none bg-transparent",
                cursor:
                  "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
              }}
              variant="light"
              showControls
              showShadow
              isCompact
              size="md"
              radius="sm"
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={setCurrentPageNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
