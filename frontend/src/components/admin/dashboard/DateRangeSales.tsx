import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../../ui/calendar";
import { Button as NUIButton } from "@nextui-org/react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

const DateRangeSales = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date().setDate(1),
    to: addDays(new Date(), 20),
  });

  const handleDateSubmit = () => {
    console.log(date);
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="mt-4 flex justify-center items-center gap-2 w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <NUIButton
          type="submit"
          color="success"
          className="text-neutral-900"
          size="sm"
          radius="sm"
          onClick={handleDateSubmit}
        >
          Submit
        </NUIButton>
      </div>
      <p className="text-left text-xs text-neutral-500 mt-1 ml-4">
        The date range is used to calculate sales periods
      </p>
    </div>
  );
};

export default DateRangeSales;
