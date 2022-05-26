import Head from "next/head";
import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { getImages } from "../../lib/gallery";
import { GetStaticProps, NextPage } from "next";

interface Props {
  gallery: {
    galleryList: string[];
    galleryFrame: string;
  };
}

const CanvasImage: NextPage<Props> = ({ gallery }) => {
  const { galleryList, galleryFrame } = gallery || {};
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const galleryFrameImg = new Image();
      // img.crossOrigin = "anonymous";
      galleryFrameImg.src = galleryFrame;
      for (let i = 0; i < galleryList.length; i++) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 15 + (15 + 132) * (i % 4), 20 + (20 + 150) * Math.floor(i / 4), 100, 115);
          ctx.drawImage(galleryFrameImg, (15 + 132) * (i % 4), (20 + 150) * Math.floor(i / 4), 132, 150);
        };
        img.onerror = () => {
          console.log("onerror");
        };
        img.src = galleryList[i];
      }
    }
  }, []);

  return (
    <div
      style={{
        background: "0 -100px repeat-x url(https://mdn.mozillademos.org/files/5415/bg_gallery.png) #4F191A",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 480,
      }}
    >
      <canvas ref={canvasRef} width={600} height={320} />
    </div>
  );
};

export default function CanvasDemo({ gallery }: Props) {
  const draw = () => {
    const canvas: any = document.getElementById("tutorial");
    if (canvas?.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect(10, 10, 55, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect(30, 30, 90, 90);

      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);

      // 填充三角形
      ctx.beginPath();
      ctx.moveTo(25, 25);
      ctx.lineTo(105, 25);
      ctx.lineTo(25, 105);
      // 通过填充路径的内容区域生成实心的图形。
      ctx.fill();

      // 描边三角形
      ctx.beginPath();
      ctx.moveTo(125, 125);
      ctx.lineTo(125, 45);
      ctx.lineTo(45, 125);
      // closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做
      ctx.closePath();
      // 通过线条来绘制图形轮廓
      ctx.stroke();

      // smile
      ctx.beginPath();
      ctx.arc(175, 175, 50, 0, Math.PI * 2, true); // 绘制
      ctx.moveTo(210, 175);
      ctx.arc(175, 175, 35, 0, Math.PI, false); // 口(顺时针)
      ctx.moveTo(165, 165);
      ctx.arc(160, 165, 5, 0, Math.PI * 2, true); // 左眼
      ctx.moveTo(195, 165);
      ctx.arc(190, 165, 5, 0, Math.PI * 2, true); // 右眼
      ctx.stroke();

      // 二次贝塞尔曲线 对话气泡
      ctx.beginPath();
      ctx.moveTo(275, 25);
      ctx.quadraticCurveTo(225, 25, 225, 62.5);
      ctx.quadraticCurveTo(225, 100, 250, 100);
      ctx.quadraticCurveTo(250, 120, 230, 125);
      ctx.quadraticCurveTo(260, 120, 265, 100);
      ctx.quadraticCurveTo(325, 100, 325, 62.5);
      ctx.quadraticCurveTo(325, 25, 275, 25);
      ctx.stroke();

      //三次贝塞尔曲线 心形
      ctx.beginPath();
      ctx.moveTo(75, 240);
      ctx.bezierCurveTo(75, 237, 70, 225, 50, 225);
      ctx.bezierCurveTo(20, 225, 20, 262.5, 20, 262.5);
      ctx.bezierCurveTo(20, 280, 40, 302, 75, 320);
      ctx.bezierCurveTo(110, 302, 130, 280, 130, 262.5);
      ctx.bezierCurveTo(130, 262.5, 130, 225, 100, 225);
      ctx.bezierCurveTo(85, 225, 75, 237, 75, 240);
      ctx.fill();

      // 画背景
      ctx.fillStyle = "#FD0";
      ctx.fillRect(300, 300, 75, 75);
      ctx.fillStyle = "#6C0";
      ctx.fillRect(375, 300, 75, 75);
      ctx.fillStyle = "#09F";
      ctx.fillRect(300, 375, 75, 75);
      ctx.fillStyle = "#F30";
      ctx.fillRect(375, 375, 75, 75);
      ctx.fillStyle = "#FFF";

      // 设置透明度值
      ctx.globalAlpha = 0.2;

      // 画半透明圆
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(375, 375, 10 + 10 * i, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  };

  const doLoad = () => {
    const video: any = document.getElementById("video1");
    video.setAttribute("crossOrigin", "");
    const c1: any = document.getElementById("c1");
    const ctx1 = c1.getContext("2d");
    const c2: any = document.getElementById("c2");
    const ctx2 = c2.getContext("2d");
    let width = 0,
      height = 0;
    const timerCallback = () => {
      if (video.paused || video.ended) {
        return;
      }
      computeFrame();
      setTimeout(function () {
        timerCallback();
      }, 0);
    };
    const computeFrame = () => {
      console.log(video.crossOrigin, video.url);
      ctx1.drawImage(video, 0, 0, width, height);
      console.log("ctx1----", ctx1);
      let frame = ctx1.getImageData(0, 0, width, height);
      console.log("frame--->", frame);
      let l = frame.data.length / 4;

      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if (g > 100 && r > 100 && b < 43) frame.data[i * 4 + 3] = 0;
      }
      ctx2.putImageData(frame, 0, 0);
      return;
    };
    video!.addEventListener(
      "play",
      () => {
        width = video.videoWidth / 2;
        height = video.videoHeight / 2;
        timerCallback();
      },
      false
    );
  };

  useEffect(() => {
    draw();
    // doLoad();
  }, []);

  return (
    <div>
      <Head>
        <title>First Post</title>
      </Head>
      <main>
        <section className={styles.section}>
          <canvas className={styles.canvas} id='tutorial' width='550' height='550'></canvas>
        </section>
        <section>
          <CanvasImage gallery={gallery} />
        </section>

        {/*<section>*/}
        {/*  <div>*/}
        {/*    <video id='video1' src='https://media.prod.mdn.mozit.cloud/samples/video/chroma-key/video.ogv' controls />*/}
        {/*  </div>*/}
        {/*  <div style={{ border: "1px solid #444444" }}>*/}
        {/*    <canvas id='c1' width='160' height='96' />*/}
        {/*    <canvas*/}
        {/*      id='c2'*/}
        {/*      width='160'*/}
        {/*      height='96'*/}
        {/*      style={{*/}
        {/*        backgroundImage: "url(https://media.prod.mdn.mozit.cloud/samples/video/chroma-key/foo.png)",*/}
        {/*        backgroundRepeat: "no-repeat",*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</section>*/}
      </main>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const res = await getImages();
  return {
    props: {
      gallery: res,
    },
  };
};
