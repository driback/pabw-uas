const { memo } = require("react");
import styles from "../style/components/ItemList.module.scss";

const ItemList = ({
  index,
  brand,
  price,
  id,
  model,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <tr className={styles.ItemList}>
      <td className={styles.ItemList__Item}>{index}</td>
      <td className={styles.ItemList__Item}>{brand}</td>
      <td className={styles.ItemList__Item}>{model}</td>
      <td className={styles.ItemList__Item}>{price}</td>
      <td className={styles.ItemList__Buttons}>
        <button
          id={id}
          className={styles.ItemList__Button}
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          id={id}
          className={styles.ItemList__Button}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default memo(ItemList);
