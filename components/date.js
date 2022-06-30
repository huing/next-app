// import { parseISO, format, isValid } from "date-fns";

export default function Date({ dateString }) {
  // console.log(isValid(new Date(dateString)));
  return <time dateTime={dateString}>{dateString}</time>;
  // if (!isValid(dateString)) {
  //   return <time dateTime={"2020-10-10"}>2020-10-10</time>;
  // }
  // const date = parseISO(dateString);
  // return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
