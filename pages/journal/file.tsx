import Head from "next/head";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useRef, useState } from "react";

export const getVideoInfo = async (videoFile: File, videoElement: any): Promise<{ duration: number }> => {
  window.URL = window.URL || window.webkitURL;
  return new Promise(resolve => {
    videoElement.preload = "metadata";
    videoElement.onloadedmetadata = function () {
      window.URL.revokeObjectURL(videoElement.src);
      resolve({ duration: videoElement.duration || 0 });
    };
    videoElement.onerror = function () {
      resolve({ duration: 0 });
    };
    videoElement.src = URL.createObjectURL(videoFile);
  });
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log("params", params);
  return {
    props: {
      data: ["123"],
    },
  };
};

// 切片大小
const SIZE = 1024 * 1024;

const request = ({ url, method = "post", data, headers = {}, requestList }: any) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(data);
    xhr.onload = (e: any) => {
      try {
        resolve({ data: JSON.parse(e.target?.response) });
      } catch (error) {
        resolve({ data: e.target?.response });
      }
    };
  });
};

// 生成文件切片
const createFileChunk = (file: Blob, size = SIZE) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList;
};

const File: NextPage<{}> = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log("Journal", props);
  const [files, setFiles] = useState<any>();
  const videoRef: any = useRef(null);

  useEffect(() => {}, []);

  // 上传切片
  const uploadChunks = async (fileChunkList: { chunk: Blob; hash: string }[]) => {
    const requestList = fileChunkList.map(({ chunk, hash }) => {
      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("hash", hash);
      formData.append("filename", files.name);
      return request({
        url: "http://localhost:3000/upload",
        data: formData,
      });
    });
    await Promise.all(requestList);
    // 主动合并切片
    const res = await request({
      url: "http://localhost:3000/merge",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({ size: SIZE, filename: files.name }),
    });
    console.log(res);
  };
  const handleUpload = async () => {
    if (!files) return;
    const fileChunkList = createFileChunk(files).map(({ file }, index) => ({
      chunk: file,
      hash: `${files.name}-${index}`,
    }));
    await uploadChunks(fileChunkList);
  };
  const handleFileChange = (e: any) => {
    setFiles(e.target.files[0]);
    getVideoInfo(e.target.files[0], videoRef.current);
  };
  return (
    <div>
      <Head>
        <title>First Post</title>
      </Head>
      <div>
        <input type={"file"} accept={"video/mp4"} onChange={handleFileChange} />
        <button onClick={handleUpload}>upload</button>
      </div>
      <video ref={videoRef} width={600} style={{ aspectRatio: "16 / 9", backgroundColor: "black" }} controls={true} />
    </div>
  );
};

export default File;
