"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  category: z.string(),
});
const CreateCategory = ({
  params,
}: {
  params: {
    site_id: Id<"sites">;
  };
}) => {
  const createCategory = useMutation(api.category.createCategory);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await createCategory({
        site_id: params.site_id,
        category: data.category,
      });
      toast.success("Category is created");
      form.reset();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Fail to create category");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[600px] mt-[0.5rem] space-y-3 mb-10"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter a category</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-inherit border border-white/15"
                  placeholder="Use category to organize articles"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-white text-black">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategory;
