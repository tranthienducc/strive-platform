"use client";
import { DataTable } from "./_component/data-table";
import { convex } from "@/services/providers/convex-provider";
import { api } from "@/convex/_generated/api";
import { useEffect, useMemo, useState } from "react";

const OrdersMagPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const result = await convex.query(api.order.getOrdersInspiration);
        setData(result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  const pageCount = useMemo(
    () => (Array.isArray(data) ? data.length : 0),
    [data]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <DataTable data={data} pageCount={pageCount}></DataTable>;
};

export default OrdersMagPage;
