import { ProductProps, ProductVariantProps } from "@/utils/types/type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QueryKeys";
import { BASE_URL } from "@/config";
import axios from "axios";

export const useGetProducts = () => {
  const { data: products } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}`);
      return res.data.data as ProductProps[];
    },
  });

  return { products };
};
export const useGetProductsVariant = () => {
  const { data: productsVariant } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_VARIANT],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}`);
      return res.data.productVariant as ProductVariantProps[];
    },
  });

  return { productsVariant };
};
export const useGetOrders = () => {
  const { data: orders } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}`);
      return res.data.orders;
    },
  });

  return { orders };
};
