"use client";
import { updateData } from "@/helper/api";
import { memo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "../style/components/PopUpdate.module.scss";

const PopUpdate = ({ id, brand, model, price, handleCancel }) => {
  const [input, setInput] = useState({
    brand,
    model,
    price,
  });

  const inputs = [
    {
      label: "brand",
      value: input?.brand,
      type: "text",
      placeholder: "Tesla",
    },
    {
      label: "model",
      value: input?.model,
      type: "text",
      placeholder: "Model S",
    },
    {
      label: "price",
      value: input?.price,
      type: "number",
      placeholder: "500",
    },
  ];

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, isSuccess, isError } = useMutation({
    mutationFn: updateData,
    onSuccess: () => queryClient.invalidateQueries(["mobil"]),
    onSettled: () => queryClient.invalidateQueries(["mobil"]),
  });

  const handleInput = (event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;

    setInput({ ...input, [name]: value });
  };

  const handleUpdate = async (event) => {
    event?.preventDefault();

    if (!input?.brand || !input?.model || !input?.price) {
      return;
    }

    try {
      await mutateAsync({
        id,
        brand: input?.brand,
        model: input?.model,
        price: input?.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.PopUpdate}>
      <form className={styles.PopUpdate__Form} onSubmit={handleUpdate}>
        <span className={styles.PopUpdate__Title}>Update Data</span>
        <div className={styles.PopUpdate__InputList}>
          {inputs?.map((da, index) => (
            <div key={index} className={styles.PopUpdate__Input}>
              <label htmlFor={da?.label}>{da?.label}</label>
              <input
                type={da?.type}
                placeholder={da?.placeholder}
                name={da?.label}
                value={da?.value}
                onChange={handleInput}
                required
              />
            </div>
          ))}
        </div>
        <div className={styles.PopUpdate__Buttons}>
          <button className={styles.PopUpdate__Button} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={styles.PopUpdate__Button}
            disabled={isLoading || isSuccess}
            style={{ backgroundColor: isError && "red" }}
          >
            {isLoading
              ? "Updating"
              : isSuccess
              ? "Updated"
              : isError
              ? "Error"
              : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(PopUpdate);
