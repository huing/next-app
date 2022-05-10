import React, { useState } from "react";
import data from "../../method/data";
import dfs from "../../method/dfs";
import flat from "../../method/flat";
import styles from "./index.module.scss";

type PropsDTO = Record<string, any>;

const Page: React.FC<PropsDTO> = () => {
  const [dfsData] = useState(dfs(data, 0));
  const [flatData] = useState(flat(dfsData));
  return (
    <div className={styles.page}>
      <section>
        <h6>原数据</h6>
        <pre className={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
      </section>
      <section>
        <h6>dsf</h6>
        <pre className={styles.pre}>{JSON.stringify(dfsData, null, 2)}</pre>
      </section>
      <section>
        <h6>flat</h6>
        <pre className={styles.pre}>{JSON.stringify(flatData, null, 2)}</pre>
      </section>
    </div>
  );
};
export default Page;
