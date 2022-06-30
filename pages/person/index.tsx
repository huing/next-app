import useSWR from "swr";
import Person from "../../components/Person";

const fetcher = (url: string) => fetch(url).then(res => res.json());

/**
 * 浏览器地址  http://localhost:3000/person
 * */
export default function List() {
  const { data, error } = useSWR("/api/people/create", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((p: any, index: number) => (
        <Person key={index} person={p} />
      ))}
    </ul>
  );
}
