import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "./bfc.module.scss";

const Promise: NextPage<{}> = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div
        style={
          {
            // backgroundColor: "red",
          }
        }
        className={styles.common_border}
      >
        border
      </div>
      <div
        style={
          {
            // backgroundColor: "blue",
          }
        }
        className={styles.common_border}
      >
        outline
      </div>
      <div
        style={
          {
            // backgroundColor: "green",
          }
        }
        className={styles.common_border}
      >
        shadow
      </div>
    </div>
  );
};
export default Promise;
