import styles from "../style/components/Table.module.scss";

const Table = ({ children }) => {
  return (
    <section className={styles?.Table}>
      <table className={styles?.Table__Card}>
        <thead className={styles?.Table__Head}>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles?.Table__Body}>{children}</tbody>
      </table>
    </section>
  );
};

export default Table;
