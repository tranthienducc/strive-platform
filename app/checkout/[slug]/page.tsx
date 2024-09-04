"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { multiPrice } from "@/utils";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { InspirationProps } from "@/utils/types/type";
import Swal from "sweetalert2";
import GrandTotal from "@/components/GrandTotal";
import { Lock } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

interface discountProps {
  name_code?: string;
  code?: string;
  amount: number;
  limit?: number;
  used?: number;
  inspiration?: string;
  start_date?: string;
  end_date?: string;
}

const PaymentPage = ({ params }: Props) => {
  const { users } = useUserContext();
  const router = useRouter();
  const buyInspirations = useMutation(api.documents.buyInspiration);
  const discounts = useQuery(api.documents.getDiscounts);
  const inspirations = useQuery(api.documents.getById);

  const filterInspiration =
    inspirations?.find((data) => {
      const inspirationData = data.slug;
      return inspirationData?.includes(params.slug);
    }) ?? ({} as InspirationProps);

  const { title, price, salePrice, coverImage, description } =
    filterInspiration;

  const filterDiscount =
    discounts?.find((item) => item.inspirations?.includes(title as string)) ??
    ({} as discountProps);

  const { amount = 0, code } = filterDiscount;

  const generateOrderCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  };

  const handleBuyInspiration = async () => {
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    const orderCode = generateOrderCode();
    try {
      await buyInspirations({
        userId: users?.id,
        product_name: title,
        amount: salePrice,
        revenue: price || 0 - amount,
        status: "Paid",
        code: code,
        order_code: orderCode,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto max-w-full w-full mt-44 mb-20 flex flex-row items-start h-screen">
      <div className="flex flex-col gap-8 max-w-[760px] w-full px-[156px]">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-medium text-white">{title}</span>
          <span className="text-xl font-normal text-gray9 inline-block whitespace-nowrap">
            {multiPrice(price || 0)} VND
          </span>
        </div>

        <Image
          src={coverImage || ""}
          alt="product"
          width={1000}
          height={1000}
          priority={true}
          className="max-w-[448px] w-full h-[336px] rounded-md"
        />

        <p className="text-sm font-normal text-gray9">
          {parse(description || "")}
        </p>
      </div>

      <div className="max-w-[760px] w-full text-white px-32">
        <span className="text-base font-medium text-black inline-block px-4 py-[5px] rounded-md bg-gray9 mb-[34px]">
          Pay by Card
        </span>

        <CheckoutForm
          handleBuyInspiration={handleBuyInspiration}
          title={title}
          salePrice={salePrice}
          price={price}
          code={code}
          amount={amount}
        />
      </div>
    </section>
  );
};

export default PaymentPage;

function CheckoutForm({
  handleBuyInspiration,
  salePrice = 0,
  price = 0,
  code,
  amount = 0,
  title,
}: {
  handleBuyInspiration: () => void;
  salePrice?: number;
  price?: number;
  code?: string;
  amount: number;
  title?: string;
}) {
  const handleCheckout = (
    event: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    // Giả lập thanh toán thành công
    Swal.fire({
      title: "Thanks for your order!",
      text: "Woohoo! Your payment was successful, and your order is complete. A receipt is on its way to your inbox.",
      confirmButtonText: "View order",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/order-summary/${title}`;
      }
    });
  };

  return (
    <form onSubmit={handleCheckout}>
      <h1 className="text-xl font-semibold mb-4">Payment</h1>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <Input
          type="text"
          placeholder="Enter your name"
          required
          className="bg-black border border-white/15 text-white placeholder:text-gray9 "
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          required
          className="bg-black border border-white/15 text-white placeholder:text-gray9 "
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Number card</label>
        <Input
          type="text"
          placeholder="Enter your number card"
          required
          className="bg-black border border-white/15 text-white placeholder:text-gray9 "
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Expire date</label>
        <Input
          type="text"
          placeholder="MM/YY"
          required
          className="bg-black border border-white/15 text-white placeholder:text-gray9 "
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">CVV</label>
        <Input
          type="text"
          placeholder="Enter CVV"
          required
          className="bg-black border border-white/15 text-white placeholder:text-gray9 "
        />
      </div>

      <GrandTotal
        price={price}
        code={code}
        salePrice={salePrice}
        amount={amount}
      />

      <Button
        type="submit"
        onClick={handleBuyInspiration}
        className="px-4 py-[10px] rounded-lg bg-white text-black text-base font-medium max-w-full w-full mt-6 hover:bg-gray9 mb-5"
      >
        Pay {multiPrice(salePrice)} VND
      </Button>

      <div className="flex flex-row gap-2 items-center">
        <Lock className="size-4 text-gray9" />
        <span className="text-sm font-medium text-gray9">
          Payments are secure and encrypted
        </span>
      </div>
    </form>
  );
}
