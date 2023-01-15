"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import Table from "@/components/Table";
import Form from "@/components/Form";
import dynamic from "next/dynamic";
import { useState } from "react";
import { deleteData } from "@/helper/api";
import PopUpdate from "@/components/PopUpdate";

const ItemList = dynamic(() => import("@/components/ItemList"));
const PopDelete = dynamic(() => import("@/components/PopDelete"));

const CrudPage = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["mobil"], queryFn: getData });
  const { mutateAsync } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      setIsDelete({ ...isDelete, isOpen: false });
      queryClient.invalidateQueries(["mobil"]);
    },
    onSettled: () => queryClient.invalidateQueries(["mobil"]),
  });

  const [isDelete, setIsDelete] = useState({
    isOpen: false,
    id: null,
  });

  const [isUpdate, setIsUpdate] = useState({
    isOpen: false,
    id: null,
    brand: null,
    model: null,
    price: null,
  });

  return (
    <>
      <Form />
      <Table>
        {data?.data?.map((da, index) => (
          <ItemList
            key={index}
            index={da?.id}
            brand={da?.brand}
            model={da?.model}
            price={da?.price}
            id={da?.id}
            handleDelete={() =>
              setIsDelete({ ...isDelete, isOpen: true, id: da?.id })
            }
            handleUpdate={() =>
              setIsUpdate({
                ...isUpdate,
                isOpen: true,
                id: da?.id,
                model: da?.model,
                brand: da?.brand,
                price: da?.price,
              })
            }
          />
        ))}
      </Table>

      {isUpdate?.isOpen && (
        <PopUpdate
          id={isUpdate?.id}
          brand={isUpdate?.brand}
          model={isUpdate?.model}
          price={isUpdate?.price}
          handleCancel={() => setIsUpdate({ ...isUpdate, isOpen: false })}
        />
      )}

      {isDelete?.isOpen && (
        <PopDelete
          handleCancel={() =>
            setIsDelete({ ...isDelete, isOpen: false, id: null })
          }
          handleDelete={async () => await mutateAsync({ id: isDelete?.id })}
        />
      )}
    </>
  );
};

export default CrudPage;

const getData = async () => {
  const res = await fetch("/api/getdata");
  return await res?.json();
};
