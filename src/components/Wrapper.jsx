import { notFound } from "next/navigation";
import styles from "../../src/style/components/Wrapper.module.scss";

const Wrapper = ({ params, children }) => {
  const rgx = /^(cars-csv|cars-json|cars-xml)$/g;
  const isMatch = params?.match(rgx);

  if (!isMatch) return notFound();

  return <section className={styles.Wrapper}>{children}</section>;
};

export default Wrapper;
