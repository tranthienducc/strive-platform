import { ProductProps, ProductVariantProps } from "@/utils/types/type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QueryKeys";
import { API_ORDERS, API_PRODUCT, API_VARIANTS } from "@/config";
import axios from "axios";

export const useGetProducts = () => {
  const { data: products } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => {
      const res = await axios.get(`${API_PRODUCT}`);
      return res.data.data as ProductProps[];
    },
  });

  return { products };
};
export const useGetProductsVariant = () => {
  const { data: productsVariant } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_VARIANT],
    queryFn: async () => {
      const res = await axios.get(`${API_VARIANTS}`);
      return res.data.productVariant as ProductVariantProps[];
    },
  });

  return { productsVariant };
};
export const useGetOrders = () => {
  const { data: orders } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: async () => {
      const res = await axios.get(`${API_ORDERS}`);
      return res.data.orders;
    },
  });

  return { orders };
};
