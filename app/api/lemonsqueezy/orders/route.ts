import { lemonSqueezyApiInstance } from "@/helper/axios";

export async function GET() {
  try {
    const ordersData = await lemonSqueezyApiInstance.get("/orders", {
      data: {
        type: "orders",
        attributes: {
          user_email: "demo123@pro",
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
        },
      },
    });

    const orders = ordersData.data.data;

    return Response.json({ orders });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An error occured" }, { status: 500 });
  }
}
