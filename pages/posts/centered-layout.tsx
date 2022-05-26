import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "./centered-layout.module.scss";

const Promise: NextPage<{}> = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className={styles.line_height}>line-height</div>
      <div className={styles.transform}>
        <div>transform</div>
      </div>
      <div className={styles.common}>shadow</div>
    </div>
  );
};
export default Promise;
