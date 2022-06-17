import { ReactChild, ReactFragment, useEffect, useRef, useState } from "react";
import styles from "./ref_state.module.scss";
// import axios from 'axios'
const axios = {
  get(url: string): any {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: { language: "en" },
        });
      }, 2000);
    });
  },
};

const Description = () => {
  console.log("render Description");
  return (
    <>
      <h1>The useState hook</h1>
      <h2>Click the button to toggle the state</h2>
    </>
  );
};

function AppDemo2() {
  console.log("render App");
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? styles.darkMode : ""}>
      <h1>The useState hook</h1>
      <h2>Click the button to toggle the state</h2>
      <Description />
      <button
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        toggle dark mode
      </button>
    </div>
  );
}

function AppDemo4({ url }: { url: string }) {
  console.log("render App");
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("de");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          const { language } = response.data;
          setLang(language);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return (
    <div className={`App ${darkMode && styles.darkMode}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{lang === "en" ? "The useState hook is awesome" : "Der useState Hook ist toll"}</h1>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            toggle dark mode
          </button>
        </>
      )}
    </div>
  );
}

function AppDemo5({ url }: { url: string }) {
  console.log("render App");
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("de");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          const { language } = response.data;
          setLang(language);
          setDarkMode(!darkMode);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, darkMode]);
  return (
    <div className={`App ${darkMode && styles.darkMode}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{lang === "en" ? "The useState hook is awesome" : "Der useState Hook ist toll"}</h1>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            toggle dark mode
          </button>
        </>
      )}
    </div>
  );
}

function AppDemo6({ url }: { url: string }) {
  console.log("render App");
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("de");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          const { language } = response.data;
          setLang(language);
          setDarkMode(previous => !previous);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return (
    <div className={`App ${darkMode && styles.darkMode}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{lang === "en" ? "The useState hook is awesome" : "Der useState Hook ist toll"}</h1>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            toggle dark mode
          </button>
        </>
      )}
    </div>
  );
}

function AppDemo7({ url }: { url: string }) {
  const initialState = {
    loading: true,
    lang: "de",
    darkMode: true,
  };
  const [state, setState] = useState(initialState);
  console.log("render App", state);
  useEffect(() => {
    console.log("useEffect");
    const fetchData = async function () {
      try {
        setState(prev => ({
          loading: true,
          lang: prev.lang,
          darkMode: prev.darkMode,
        }));
        const response = await axios.get(url);
        if (response.status === 200) {
          const { language } = response.data;
          setState(prev => ({
            lang: language,
            darkMode: !prev.darkMode,
            loading: prev.loading,
          }));
        }
      } catch (error) {
        throw error;
      } finally {
        setState(prev => ({
          loading: false,
          lang: prev.lang,
          darkMode: prev.darkMode,
        }));
      }
    };
    fetchData();
  }, [url]);
  return (
    <div className={`App ${state.darkMode && styles.darkMode}`}>
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{state.lang === "en" ? "The useState hook is awesome" : "Der useState Hook ist toll"}</h1>
          <button
            onClick={() => {
              setState(prev => ({
                darkMode: !prev.darkMode,
                // lang: prev.lang,
                loading: prev.loading,
              }));
            }}
          >
            toggle dark mode
          </button>
        </>
      )}
    </div>
  );
}

const AppDemo8 = () => {
  const ref1 = useRef();
  const ref2 = useRef(2021);
  console.log("render");
  console.log(ref1, ref2);
  return (
    <div>
      <h2>{ref1.current}</h2>
      <h2>{ref2.current}</h2>
    </div>
  );
};

const AppDemo9 = () => {
  const countRef = useRef(0);
  console.log("render");
  return (
    <div className='App'>
      <h2>count: {countRef.current}</h2>
      <button
        onClick={() => {
          countRef.current = countRef.current + 1;
          console.log(countRef.current);
        }}
      >
        increase count
      </button>
    </div>
  );
};

const AppDemo10 = () => {
  const [value, setValue] = useState("");
  console.log("render");
  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div className='App'>
      <input value={value} onChange={handleInputChange} />
    </div>
  );
};

const AppDemo11 = () => {
  const [value, setValue] = useState("");
  const valueRef: any = useRef();
  console.log("render");
  const handleClick = () => {
    console.log(valueRef);
    setValue(valueRef.current?.value);
  };
  return (
    <div className='App'>
      <h4>Value: {value}</h4>
      <input ref={valueRef} />
      <button onClick={handleClick}>click</button>
    </div>
  );
};

const AppDemo13 = () => {
  console.log("render");
  const [count, setCount] = useState(0);
  // Get the previous value (was passed into hook on last render)
  const ref: any = useRef();
  // Store current value in ref
  useEffect(() => {
    console.log("useEffect");
    ref.current = count;
  }, [count]); // Only re-run if value changes
  return (
    <div className='App'>
      <h1>
        Now: {count}, before: {ref.current}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const AppDemo14 = () => {
  console.log("render");
  const [count, setCount] = useState(0);
  let prevCount: number | undefined;
  useEffect(() => {
    console.log("useEffect", prevCount);
    prevCount = count;
  }, [count]);
  return (
    <div className='App'>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const AppDemo16 = () => {
  console.log("render AppDemo16");
  const ref: any = useRef(0);
  return (
    <div className='App'>
      <h1>{ref.current++}</h1>
      <h2>{ref.current}</h2>
    </div>
  );
};

const AppDemo15 = () => {
  console.log("render");
  const [count, setCount] = useState(0);
  const ref: any = useRef();
  useEffect(() => {
    console.log("useEffect", count);
    ref.current = count;
  }, [count]);
  return (
    <div className='App'>
      <h1>
        Now: {count}, before: {ref.current}
      </h1>
      <AppDemo16 />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default AppDemo15;
