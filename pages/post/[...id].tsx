import Layout from "../../components/Layout";
import Date from "../../components/date";
import { PostDataDTO } from "../../types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  postData: PostDataDTO;
}

export default function Post(props: Props) {
  // const { postData } = props;
  const [postData, setPostData] = useState<PostDataDTO>();
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  useEffect(() => {
    const getDetail = async () => {
      const res = await fetch(`/api/post?url=${(id as string[]).join("/")}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setPostData(resData);
    };
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <Layout title={postData?.title || ""}>
      <h1> {postData?.title}</h1>
      <Date dateString={postData?.date} />
      <div dangerouslySetInnerHTML={{ __html: postData?.contentHtml || "" }} />
    </Layout>
  );
}
/** 可以这种方式实现，也可以拿到参数后发请求拿到数据 */
// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };
//
// export const getStaticProps: GetStaticProps = async props => {
//   const { params } = props || {};
//   let path;
//   if (typeof params?.id === "string") {
//     path = [params.id];
//   } else {
//     path = params?.id || [];
//   }
//   // Fetch necessary data for the blog post using params.id
//   const postData = await getPostData(path.join("/"));
//   return {
//     props: {
//       postData,
//     },
//   };
// };
