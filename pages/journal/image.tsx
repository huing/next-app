import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./index.module.scss";

const images = [
  "https://mdn.mozillademos.org/files/5399/gallery_1.jpg",
  "https://mdn.mozillademos.org/files/5401/gallery_2.jpg",
  "https://mdn.mozillademos.org/files/5403/gallery_3.jpg",
  "https://mdn.mozillademos.org/files/5405/gallery_4.jpg",
  "https://mdn.mozillademos.org/files/5407/gallery_5.jpg",
  "https://mdn.mozillademos.org/files/5409/gallery_6.jpg",
  "https://mdn.mozillademos.org/files/5411/gallery_7.jpg",
  "https://mdn.mozillademos.org/files/5413/gallery_8.jpg",
  "https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png",
];

export default function CanvasDemo() {
  useEffect(() => {
    /*
     * 利用window 自带方法 交叉观察者
     *
     * */
    const io = new IntersectionObserver(entries => {
      // console.log("entries", entries);
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const data_src = image.getAttribute("data-src");
          image.setAttribute("src", data_src || "");
          io.unobserve(image);
        }
      });
    });
    const imagesScroll = document.getElementsByClassName("image-scroll");
    Array.from(imagesScroll).forEach(el => {
      io.observe(el);
    });
    /*
     * 滚动加载
     *
     * */
    // const handlescroll = () => {
    //   array.prototype.slice.call(imagesscroll).map(image => {
    //     const imagetop = image.getboundingclientrect().top;
    //     if (imagetop < window.innerheight) {
    //       const data_src = image.getattribute("data-src");
    //       image.setattribute("src", data_src);
    //     }
    //   });
    // };
    // window.addeventlistener("scroll", handlescroll);
    // return () => {
    //   window.removeeventlistener("scroll", handlescroll);
    // };
  }, []);
  return (
    <div>
      <Head>
        <title>图片懒加载</title>
      </Head>
      <main>
        <section className={styles.sectionTable}>
          {images.map(item => (
            <img data-src={item} key={item} className={"image-scroll"} alt={"图片"} />
          ))}
        </section>
      </main>
    </div>
  );
}
