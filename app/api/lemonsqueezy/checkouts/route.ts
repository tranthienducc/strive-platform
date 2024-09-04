import { lemonSqueezyApiInstance } from "@/helper/axios";

export async function POST(req: Request) {
  try {
    const reqData = await req.json();

    if (!reqData.productId)
      return Response.json(
        { message: "productId is required" },
        { status: 400 }
      );

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: "test",
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId?.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response?.data?.data?.attributes?.url;
    console.log(response.data);

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An error occured" }, { status: 500 });
  }
}
