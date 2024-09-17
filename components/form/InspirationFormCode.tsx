"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FormValuesDiscount } from "@/utils/types/type";
import { toast } from "sonner";
import InputGenerateCode from "../InputGenerateCode";
import DatePicker from "../common/DatePicker";
import { genarateCodeRandom } from "@/helper";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const InspirationFormCode = ({
  setCloseDialog,
}: {
  setCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inspirations = useQuery(api.inspiration.getAllInspiration);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const createDiscountCode = useMutation(api.discount.createDiscountCode);
  const form = useForm<FormValuesDiscount>({
    defaultValues: {
      name_code: "",
      code: "",
      amount: 0,
      limit: 0,
      inspirations: "",
      start_date: "",
      end_date: "",
    },
  });

  const handleRandomCode = () => {
    const randomCode = genarateCodeRandom(8);
    form.setValue("code", randomCode);
  };

  const handleSubmit: SubmitHandler<FormValuesDiscount> = async (data) => {
    setIsSubmiting(true);
    try {
      const amount =
        typeof data.amount === "string" ? parseFloat(data.amount) : data.amount;
      const start_date = data.start_date
        ? format(new Date(data.start_date), "yyyy-MM-dd")
        : "";
      const end_date = data.end_date
        ? format(new Date(data.end_date), "yyyy-MM-dd")
        : "";

      const response = await createDiscountCode({
        ...data,
        amount,
        start_date,
        end_date,
      });
      toast.success("New code discounts created!");
      setCloseDialog(false);
      router.push("/discount-manage");
      return response;
    } catch (error) {
      toast.error("Failed to create a new code discounts...");
      console.log("Failed to create disocunt code", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="shadow-md max-w-full w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-row gap-x-4 mb-2 max-w-full w-full">
          <FormField
            control={form.control}
            name="name_code"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="text"
                    required
                    placeholder="Sale"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Code
                </FormLabel>
                <FormControl>
                  <InputGenerateCode
                    field={field}
                    handleRandomCode={handleRandomCode}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-x-4 mb-2 max-w-full w-full">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="number"
                    required
                    placeholder="100.000"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Limit used
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="20"
                    type="number"
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="inspirations"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
              <FormLabel className="text-white font-medium text-base">
                Inspirations
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspiration" />
                  </SelectTrigger>
                  <SelectContent {...field}>
                    {inspirations?.map((inspiration) => (
                      <SelectItem
                        key={inspiration._id}
                        value={inspiration.title as string}
                      >
                        {inspiration.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between items-start mt-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-full w-full mb-5">
                <FormLabel className="text-white font-medium text-base">
                  Start date
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={(date) =>
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-full w-full mb-5">
                <FormLabel className="text-white font-medium text-base">
                  End date
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={(date) =>
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-end justify-end">
          <Button
            type="submit"
            disabled={isSubmiting}
            className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
          >
            {isSubmiting ? <Spinner /> : "Publish now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InspirationFormCode;
