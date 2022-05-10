import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllPostIds, getPostData } from "../../lib/posts";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params", params);
  return {
    props: {
      data: ["123"],
    },
  };
};

export default function Jounery(props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("Jounery", props);
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};
