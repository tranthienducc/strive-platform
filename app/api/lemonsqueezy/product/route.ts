import { lemonSqueezyApiInstance } from "@/helper/axios";

export async function GET() {
  try {
    const product = await lemonSqueezyApiInstance.get("/products", {
      data: {
        type: "products",
        attributes: {
          checkout_data: {
            custom: {
              user_id: "123",
              user_email: "",
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
        },
      },
    });

    const data = product.data.data;

    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An error occured" }, { status: 500 });
  }
}
