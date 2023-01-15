import { memo } from "react";
import styles from "../style/components/List.module.scss";

const List = ({ id, name, price }) => {
  return (
    <div className={styles.List}>
      <span>{id}</span>
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
};

export default memo(List);
