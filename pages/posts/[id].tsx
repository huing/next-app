import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostDataDTO } from "../../types";

interface Props {
  postData: PostDataDTO;
}

export default function Post(props: Props) {
  const { postData } = props;
  return (
    <Layout title={postData.title}>
      <h1> {postData.title}</h1>
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params?.id);
  const paths = getAllPostIds();
  console.log("paths", paths);
  return {
    props: {
      postData,
    },
  };
};
