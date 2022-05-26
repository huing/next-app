import Head from "next/head";
import { NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params", params);
  return {
    props: {
      data: ["123"],
    },
  };
};

const Journal: NextPage<{}> = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Journal", props);

  useEffect(() => {}, []);

  const handleCopy = async () => {
    const appSecret = "0d0414f3f259e3be852cc168d602ddb7";
    try {
      await navigator.clipboard.writeText(appSecret);
    } catch (e) {
      console.log("请检查权限及浏览器版本！");
    }
  };

  return (
    <div>
      <Head>
        <title>First Post</title>
      </Head>
      <a onClick={handleCopy}>复制</a>
    </div>
  );
};

export default Journal;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};
