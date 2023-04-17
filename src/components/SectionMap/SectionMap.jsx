import styles from "./style.module.scss";
import CustoMap from "../CustomMap/CustomMap";

const SectionMap = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>КАРТА</h1>
      <div className={styles.cardWrapper}>
        <CustoMap />
      </div>
    </div>
  );
};

export default SectionMap;
