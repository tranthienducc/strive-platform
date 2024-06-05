import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { File, ListFilter } from "lucide-react";

const DropListMenu = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only">Export</span>
      </Button>
    </>
  );
};

export default DropListMenu;
