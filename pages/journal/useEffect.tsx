import { Component, useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      /**
       *  3
       */
      alert("You clicked on: " + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}

function Counter1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

class Child extends Component<any, any> {
  state = {
    data: null,
  };
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    return <div>child</div>;
  }
}

class Parent extends Component {
  state = {
    query: "react",
  };
  fetchData = () => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + this.state.query;
    console.log(url);

    // ... Fetch data and do something ...
  };
  render() {
    return <Child fetchData={this.fetchData} />;
  }
}

export default Parent;
