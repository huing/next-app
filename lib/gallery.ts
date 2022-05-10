import fs from "fs";
import path from "path";

const imagesDirectory = path.join(process.cwd(), "public/gallery");

const getImages = () => {
  const fileNames = fs.readdirSync(imagesDirectory);
  // const arr = fileNames.map(fileName => fs.readFileSync(`public/${fileName}`, { encoding: "base64" }));
  const arr = fileNames.map(fileName => `/gallery/${fileName}`);
  const index = fileNames.findIndex(item => item.includes("frame"));
  const galleryFrame = arr[index];
  arr.splice(index, 1);
  return {
    galleryList: arr,
    galleryFrame,
  };
};
export { getImages };
