import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { format } from "date-fns";

const postsDirectory = path.join(process.cwd(), "blog/content/");

// 获取所有文件路径
const getAllFiles = function (dirPath: string, dirLevels: string[]) {
  const dirC = postsDirectory + dirPath;
  const files = fs.readdirSync(dirC);
  dirLevels = dirLevels || [];
  files.forEach(function (file, index) {
    if (fs.statSync(dirC + file).isDirectory()) {
      getAllFiles(dirPath + file + "/", dirLevels);
    } else {
      if (file.startsWith(".DS_Store")) return;
      dirLevels.push(dirPath + file.replace(/\.md$/, ""));
    }
  });
  return dirLevels;
};

// 所有路径详情
export function getAllPostsData() {
  // Get file names under /post
  const arrayOfFiles: any[] = [];
  getAllFiles("", arrayOfFiles);
  return arrayOfFiles.map(fileName => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName + ".md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const {
      data: { date, lastmod, ...rest },
    } = matterResult || { data: {} };
    // Combine the data with the id
    return {
      id: fileName,
      ...rest,
      date: date ? format(date, "yyyy-MM-dd") : "2020-10-10",
      lastmod: lastmod ? format(lastmod, "yyyy-MM-dd") : "2020-10-10",
    };
  });
}
// 所有路径
export function getAllPostIds() {
  const dirLevels: string[] = [];
  getAllFiles("", dirLevels);
  return dirLevels.map(fileName => {
    return {
      params: {
        id: fileName.split("/"),
        name: fileName,
      },
    };
  });
}
/* 详情 */
export async function getPostData(id: any) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id and contentHtml
  const {
    data: { date, lastmod, ...rest },
  } = matterResult || { data: {} };
  // Combine the data with the id
  return {
    id: id.replace(postsDirectory, ""),
    contentHtml,
    ...rest,
    date: date ? format(date, "yyyy-MM-dd") : "2020-10-10",
    lastmod: lastmod ? format(lastmod, "yyyy-MM-dd") : "2020-10-10",
  };
}
