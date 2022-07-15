import { NextPage } from "next";
import { useEffect, useState } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { MenuData } from "../../types";
import store from "./mobx";

let timer: NodeJS.Timeout;
const Demo: NextPage = props => {
  const localStore = useLocalObservable(() => store);
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  useEffect(() => {
    const getMenuData = async () => {
      const res = await (await fetch("/api/demo")).json();
      console.log("getMenuData", res);
      setMenuData(res);
    };
    getMenuData();
  }, []);

  useEffect(() => {
    timer = setInterval(() => {
      localStore.increase();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [localStore]);

  const renderMenu = (data: MenuData[]) => {
    return (
      <ul>
        {data.map(item => {
          if (item.children) {
            return (
              <ul key={item.id}>
                {item.name}
                {renderMenu(item.children)}
              </ul>
            );
          }
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className='page-demo'>
      <section className='sider'>{renderMenu(menuData)}</section>
      <section className='header'>icon</section>
      <main className='main-content'>
        <button onClick={() => localStore.reset()}>{localStore.secondPassed}</button>
        {/* <button onClick={localStore.reset.bind(store)}>{localStore.secondPassed}</button>
        <button onClick={reset}>{localStore.secondPassed}</button> */}
      </main>
    </div>
  );
};

export default observer(Demo);
