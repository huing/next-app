import Link from "next/link";
import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";
import Date from "../../components/date";
import { AllPostsDataDTO } from "../../types";

interface Props {
  allPostsData: AllPostsDataDTO[];
}

export default function Post(props: Props) {
  const { allPostsData } = props;
  return (
    <Layout title='首页'>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li className={""} key={id}>
            <Link href={`/posts/${id}`}>
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
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}
