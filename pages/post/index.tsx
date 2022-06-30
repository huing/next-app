import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostsData } from "../../lib/post";
import Date from "../../components/date";
import { AllPostsDataDTO } from "../../types";
import Header from "../../components/Header";

interface Props {
  allPostsData: AllPostsDataDTO[];
}

export default function Post(props: Props) {
  const { allPostsData } = props;
  return (
    <Layout title='首页'>
      <Header />
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li className={""} key={id}>
            <Link href='/post/[...id]' as={`/post/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={""}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getAllPostsData();
  return {
    props: { allPostsData },
  };
}
