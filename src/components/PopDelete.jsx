import { memo } from "react";
import styles from "../style/components/Delete.module.scss";

const PopDelete = ({ handleCancel, handleDelete }) => {
  return (
    <div className={styles?.Delete}>
      <div className={styles?.Delete__Box}>
        <h5 className={styles?.Delete__Title}>Yakinkah?</h5>
        <div className={styles?.Delete__Cta}>
          <button className={styles?.Delete__Cancel} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles?.Delete__Del} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(PopDelete);
