import React, { memo, useCallback, useMemo, useState } from "react";
import { useFetch } from "../../lib/useFetch";

function Swatch({ color }: { color: string }) {
  console.log(`Swatch rendered ${color}`);
  return <div style={{ margin: 2, width: 75, height: 75, backgroundColor: color }} />;
}

function Swatch1({ params, onClick }: { params: { color: string }; onClick?: () => void }) {
  console.log(`Swatch rendered ${params.color}`);
  return <div style={{ margin: 2, width: 75, height: 75, backgroundColor: params.color }} onClick={onClick} />;
}

const MemoedSwatch = memo(Swatch);
const MemoedSwatch1 = memo(Swatch1, (prevProps, nextProps) => {
  return prevProps.params.color === nextProps.params.color;
});
const MemoedSwatch2 = memo(Swatch1);

function App() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);

  const [color, setColor] = useState("red");

  const params = useMemo(() => ({ color }), [color]);

  const onClick = useCallback(() => {}, []);

  const [url, setUrl] = useState("");

  /**
   * 直接写url,deps依赖options 会触发useFetch一直更新，{url}对象引用，每次的options都不同
   */
  // const { data } = useFetch({ url });

  /**
   * 适用变量名每次的option都是同一个引用，不会重复触发deps更新
   */
  // const myOptions = useMemo(() => ({ url }), [url]);
  // const { data } = useFetch(myOptions);

  const { data } = useFetch({
    url,
    onSuccess: () => {
      console.log("success");
    },
  });

  console.log(`App rendered ${appRenderIndex}`);

  return (
    <div>
      <div>
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>Re-Render App</button>
        <button onClick={() => setColor(color === "red" ? "blue" : "red")}>Change Color</button>
      </div>
      <div>
        {/**
         *  啥也不用
         *  */}
        {/*<Swatch color={color} />*/}
        {/***
         *  用memo
         * */}
        {/*<MemoedSwatch color={color} />*/}
        {/**
         * object作为参数
         *  */}
        {/*<MemoedSwatch1 params={{ color }} />*/}
        {/**
         *  object作为参数 useMemo
         * */}
        {/*<MemoedSwatch2 params={params} />*/}
        {/**
         *  onClick 会重新触发渲染
         * */}
        {/*<MemoedSwatch2 params={params} onClick={() => {}} />*/}
        {/**
         * onClick useCallback ok
         * */}
        {/* <MemoedSwatch2 params={params} onClick={onClick} /> */}

        <Swatch1 params={params} onClick={onClick} />

        <div>Hello, {JSON.stringify(data)}</div>
        <div>
          <button onClick={() => setUrl("/jack.json")}>Jack</button>
          <button onClick={() => setUrl("/sally.json")}>Sally</button>
        </div>
      </div>
    </div>
  );
}

export default App;
