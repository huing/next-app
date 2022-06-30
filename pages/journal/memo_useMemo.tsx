// import Counts from "./counts";
import { useState, useEffect, useRef } from "react";

const constants = {
  MOZARELLA: "MOZARELLA",
  CHEDDAR: "CHEDDAR",
  PARMESAN: "PARMESAN",
  CABERNET: "CABERNET",
  CHARDONAY: "CHARDONAY",
  MERLOT: "MERLOT",
};
const { MOZARELLA, CHEDDAR, PARMESAN, CABERNET, CHARDONAY, MERLOT } = constants;

function Button({ text, onClick }: any) {
  console.log("render Button");
  return <button onClick={onClick}>{text}</button>;
}

function Counts() {
  const renderCount = useRef(0);
  return (
    <div className='mt-3'>
      <p className='dark:text-white'>
        Nothing has changed here but I am ve now rendered: <span className='dark:text-green-300 text-grey-900'>{renderCount.current++} time(s)</span>
      </p>
    </div>
  );
}

export default function ParentComponent() {
  const [cheeseType, setCheeseType] = useState("");
  const [wine, setWine] = useState("");
  const whichWineGoesBest = () => {
    switch (cheeseType) {
      case MOZARELLA:
        return setWine(CABERNET);
      case CHEDDAR:
        return setWine(CHARDONAY);
      case PARMESAN:
        return setWine(MERLOT);
      default:
        CHARDONAY;
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      whichWineGoesBest();
    }
    return () => {
      mounted = false;
    };
  }, [cheeseType]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className='text-center dark:text-gray-400 mt-10'>Without React.memo() or useMemo()</h3>
      <h1 className='font-semibold text-2xl dark:text-white max-w-md text-center'>Select a cheese and we will tell you which wine goes best!</h1>
      <div className='flex flex-col gap-4 mt-10'>
        <Button text={MOZARELLA} onClick={() => setCheeseType(MOZARELLA)} />
        <Button text={CHEDDAR} onClick={() => setCheeseType(CHEDDAR)} />
        <Button text={PARMESAN} onClick={() => setCheeseType(PARMESAN)} />
      </div>
      {cheeseType && (
        <p className='mt-5 dark:text-green-400 font-semibold'>
          For {cheeseType}, <span className='dark:text-yellow-500'>{wine}</span> goes best.
        </p>
      )}
      <Counts />
    </div>
  );
}
