import { FormValuesDiscount } from "@/utils/types/type";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "./ui/input";
import { Shuffle } from "lucide-react";

const InputGenerateCode = ({
  field,
  handleRandomCode,
}: {
  field: ControllerRenderProps<FormValuesDiscount, "code">;
  handleRandomCode: () => void;
}) => {
  return (
    <div className="relative">
      <Input
        className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
        type="text"
        required
        readOnly
        placeholder="DAPWH1F2"
        {...field}
      />
      <Shuffle
        onClick={handleRandomCode}
        className="size-4 text-gray9 absolute right-3 bottom-4 cursor-pointer"
      />
    </div>
  );
};

export default InputGenerateCode;
