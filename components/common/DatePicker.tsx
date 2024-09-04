import { format, parseISO } from "date-fns";
import { Calendar } from "../ui/calendar";

const DatePicker = ({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (date: Date | undefined) => void;
}) => {
  console.log("value", value);
  const handleSelect = (date: Date | undefined) => {
    console.log("date", date);
    onChange(date);
  };

  return (
    <>
      <Calendar
        mode="single"
        selected={typeof value === "string" ? parseISO(value) : value}
        onSelect={handleSelect}
        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
        initialFocus
        className="border border-white/15 text-white max-w-fit rounded-md"
      />
      {value ? (
        <span className="text-gray9">{format(value, "PPP")}</span>
      ) : (
        <span className="text-white">Pick a date</span>
      )}
    </>
  );
};

export default DatePicker;
