import type { NextPage } from "next";
import { useEffect } from "react";
import "../../jounery/js_this";

const Promise: NextPage<{}> = () => {
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
      <div>content</div>
      <a onClick={handleCopy}>复制</a>
    </div>
  );
};
export default Promise;
