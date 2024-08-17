import { useState, useEffect } from "react";
import axios from "axios";
import { ProductProps, ProductVariantProps } from "@/utils/types/type";

export function useFetchProductData(apiEndpoint: string) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productsVariant, setProductsVariant] = useState<ProductVariantProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const { data, productVariant } = res.data;

        if (Array.isArray(productVariant)) {
          setProductsVariant(productVariant.slice(1));
        } else {
          console.error("Returns data that is not an array", res.data);
        }

        setProducts(data);
      } catch (error) {
        console.error("Error getting data from API", error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { products, productsVariant };
}
