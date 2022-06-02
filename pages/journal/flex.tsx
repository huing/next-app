import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";
import styles from "./flex.module.scss";

const Flex: NextPage<{}> = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Head>
        <title>First Post</title>
      </Head>
      <div>
        <a href={"https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/382"} target={"_blank"} rel='noreferrer'>
          地址
        </a>
      </div>
      <pre>flex-grow受max-width影响， 如果最终 grow 后的结果大于 max-width 指定的值，max-width 的值将会优先使用。同样会导致父元素有部分剩余空间没有分配</pre>
      <pre>flex-shrink受min-width影响</pre>

      <code>
        <pre>剩余空间 600 - 300 - 200 = 100</pre>
        <pre>left 300 + 100 * 1 / 3 = 333.33 </pre>
        <pre>right 200 + 100 * 2 / 3 = 266.66 </pre>
      </code>
      <div className={styles.container}>
        <div className={styles.left_grow}>left</div>
        <div className={styles.right_grow}>right</div>
      </div>
      <code>
        <pre>剩余空间 600 - 300 - 200 = 100</pre>
        <pre>伸张空间 100 * (0.1 + 0.2) = 30</pre>
        <pre>left 300 + 100 * 0.1 / 1 = 310 </pre>
        <pre>right 200 + 100 * 0.2 / 1 = 220 </pre>
      </code>
      <div className={styles.container}>
        <div className={styles.left_grow_1}>left</div>
        <div className={styles.right_grow_1}>right</div>
      </div>
      <code>
        <pre>溢出空间 500 + 400 - 600 = 300</pre>
        <pre>权重 500 * 2 + 400 * 1 = 1400 </pre>
        <pre>left 500 - 300 * 500 * 2 / 1400 = 285.71 </pre>
        <pre>right 400 - 300 * 400 * 1 / 1400 = 314.28 </pre>
      </code>
      <div className={styles.container}>
        <div className={styles.left_shrink}>left</div>
        <div className={styles.right_shrink}>right</div>
      </div>
      <code>
        <pre>溢出空间 500 + 400 - 600 = 300</pre>
        <pre>收缩空间 300 * (0.2 + 0.1) / 1 = 90</pre>
        <pre>权重 500 * 0.2 + 400 * 0.1 = 140 </pre>
        <pre>left 500 - 90 * 0.2 * 500 / 140 = 435.71</pre>
        <pre>right 400 - 90 * 0.1 * 400 / 140 = 374.28</pre>
      </code>
      <div className={styles.container}>
        <div className={styles.left_shrink_1}>left</div>
        <div className={styles.right_shrink_1}>right</div>
      </div>
    </div>
  );
};

export default Flex;
