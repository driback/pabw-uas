"use client";

import { createData } from "@/helper/api";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "../style/components/Form.module.scss";

const Form = () => {
  const brand = useRef(null);
  const model = useRef(null);
  const price = useRef(null);

  const inputs = [
    {
      label: "brand",
      ref: brand,
      type: "text",
      placeholder: "Tesla",
    },
    {
      label: "model",
      ref: model,
      type: "text",
      placeholder: "Model S",
    },
    {
      label: "price",
      ref: price,
      type: "number",
      placeholder: "500",
    },
  ];

  const queryClient = useQueryClient();

  const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
    mutationFn: createData,
    onError: (error, newData, context) => console.log(error),
    onSuccess: () => queryClient.invalidateQueries(["mobil"]),
    onSettled: () => queryClient.invalidateQueries(["mobil"]),
  });

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const brandVal = brand?.current?.value;
    const modelVal = model?.current?.value;
    const priceVal = price?.current?.value;

    if (!brandVal || !modelVal || !priceVal) {
      return;
    }

    try {
      await mutateAsync({
        brand: brandVal,
        model: modelVal,
        price: priceVal,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.Form}>
      <form className={styles.Form__Card} onSubmit={handleSubmit}>
        <span className={styles.Form__Title}>Create Data</span>
        <div className={styles.Form__InputList}>
          {inputs?.map((da, index) => (
            <div key={index} className={styles.Form__Input}>
              <label htmlFor={da?.label}>{da?.label}</label>
              <input
                type={da?.type}
                placeholder={da?.placeholder}
                name={da?.label}
                ref={da?.ref}
                required
              />
            </div>
          ))}
        </div>
        <button className={styles.Form__Button}>
          {isLoading
            ? "Adding"
            : isSuccess
            ? "Added"
            : isError
            ? "Error"
            : "Add"}
        </button>
      </form>
    </section>
  );
};

export default Form;
