import type { NextPage } from "next";
import styles from "./bfc.module.scss";

const BFC: NextPage = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.left}>左侧</div>
      <div className={styles.right}>右侧</div>
    </div>
  );
};

export default BFC;
