import { lemonSqueezyApiInstance } from "@/helper/axios";

export async function GET() {
  try {
    const variantData = await lemonSqueezyApiInstance.get("/variants", {
      data: {
        type: "variants",
        attributes: {
          variant_id: 402689,
        },
        relationships: {
          product: {
            data: {
              type: "variants",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
        },
      },
    });

    const productVariant = variantData.data.data;

    return Response.json({ productVariant });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An error occured" }, { status: 500 });
  }
}
