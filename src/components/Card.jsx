import dynamic from "next/dynamic";
import styles from "../style/components/Card.module.scss";

const List = dynamic(() => import("./List"));

const Card = ({ title, datas }) => {
  return (
    <div className={styles.Card}>
      <h4>{title}</h4>
      {datas?.map((dt, index) => (
        <List key={index} id={dt?.Id} name={dt?.Name} price={dt?.Price} />
      ))}
    </div>
  );
};

export default Card;
