import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import Container from "./Container";

import { useSelector } from "react-redux";

const Sort = ({ gridView, setGridView, filteredProducts }) => {
  const items = [
    { key: "new", label: "New file" },
    { key: "copy", label: "Copy link" },
    { key: "edit", label: "Edit file" },
    { key: "delete", label: "Delete file" },
  ];

  const searchTerm = useSelector((state: string) => {
    return state.search.searchTerm;
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-300">
      <div className="flex justify-between items-center px-4 py-1 container">
        {/* LEFT */}
        <div className="text-black/70 leading-5">
          <span className="font-bold">{filteredProducts}</span> results&nbsp;
          {searchTerm ? (
            <>
              <span className="font-bold text-orange-800">found</span>&nbsp;
              with the keyword&nbsp;
              <span className="font-bold">"{searchTerm}".</span>
            </>
          ) : (
            <span>in all products.</span>
          )}
        </div>
        {/* RIGHT */}
        <div className="flex items-center justify-between gap-4">
          {/* toggle button */}
          <div>
            <ButtonGroup variant="solid" color="default" size="sm" radius="sm">
              <Button
                className="dark:bg-gray-800"
                isDisabled={gridView === true && true}
                onClick={() => {
                  setGridView(true);
                }}
              >
                <LayoutGrid size={20} />
              </Button>
              <Button
                className="dark:bg-gray-800"
                isDisabled={gridView === false && true}
                onClick={() => {
                  setGridView(false);
                }}
              >
                <List size={20} />
              </Button>
            </ButtonGroup>
          </div>
          {/* select type */}
          <div>
            <Dropdown type="listbox" radius="sm">
              <DropdownTrigger size="sm" variant="flat" radius="sm">
                <Button variant="bordered" className="dark:bg-gray-800">
                  Options <ChevronDown size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dynamic Actions"
                items={items}
                variant="flat"
              >
                {(item) => {
                  return (
                    <DropdownItem key={item.key} color="default">
                      {item.label}
                    </DropdownItem>
                  );
                }}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
