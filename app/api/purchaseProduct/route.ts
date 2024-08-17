import { lemonSqueezyApiInstance } from "@/helper/axios";

export const dynamic = "force-dynamic";

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
              user_id: "456",
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

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An error occured" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ress = await lemonSqueezyApiInstance.get("/products", {
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

    const data = ress.data.data;
    const productVariant = variantData.data.data;
    const orders = ordersData.data.data;

    return Response.json({ data, productVariant, orders });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "An error occured" }, { status: 500 });
  }
}
