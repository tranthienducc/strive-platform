"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DataPicker = () => {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] justify-start text-left font-normal rounded-md border bg-inherit border-stone-700 hover:text-black flex-1",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-200 hover:text-black" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-gray9">Select dates</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-md border bg-inherit border-stone-800 text-gray9"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DataPicker;
