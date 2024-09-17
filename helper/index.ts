import { OrderSummary } from "@/utils/types/type";

export const genarateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const genarateCodeRandom = (length: number) => {
  const codeRegex = "123456789ABCDEFGHIJKLMNOPQRSUVWXZY";
  let results = "";
  const charactersLength = codeRegex.length;

  for (let i = 0; i < length; i++) {
    results += codeRegex.charAt(Math.floor(Math.random() * charactersLength));
  }
  return results;
};

export const generateOrderCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

export const processOrdersByMonth = (orders: any[]): OrderSummary[] => {
  const ordersByMonth = new Map<string, OrderSummary>();

  orders?.forEach((order: any) => {
    const date = new Date(order._creationTime);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (ordersByMonth.has(monthKey)) {
      const existingSumary = ordersByMonth.get(monthKey)!;
      existingSumary.count += 1;
      existingSumary.revenue += order.revenue;
    } else {
      ordersByMonth.set(monthKey, {
        month: monthKey,
        count: 1,
        revenue: order.revenue,
      });
    }
  });

  return Array.from(ordersByMonth.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
};
