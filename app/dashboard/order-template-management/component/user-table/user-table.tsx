"use client";
import { useEffect, useMemo, useState } from "react";
import { getColumns } from "./user-table-column";
import { useDataTable } from "../state/hooks/use-data-table";
import { DataTable } from "@/app/dashboard/order-template-management/component/data-table/data-table";

import { DataTableToolbar } from "@/app/dashboard/order-template-management/component/data-table/data-table-toolbar";
import axios from "axios";
import { useFetchProductData } from "@/state/hooks/useFetchProducts";

export function UsersTable() {
  const { products } = useFetchProductData("/api/purchaseProduct");
  const dataId = products.map((product) => product.attributes.store_id);
  const [orderProducts, setOrderProducts] = useState([]);
  const data: any[] = orderProducts?.map((order) => order);
  const pageCount = data?.length;

  const columns = useMemo(() => getColumns({ data }), [data]);

  const filterFields = [
    {
      label: "Username",
      value: "username" as keyof (typeof data)[0],
      placeholder: "Filter usernames...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct", {
          params: {
            storeId: dataId,
          },
        });

        setOrderProducts(res.data.orders);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API", error);
      }
    };

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataTable table={table}>
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
      ></DataTableToolbar>
    </DataTable>
  );
}
