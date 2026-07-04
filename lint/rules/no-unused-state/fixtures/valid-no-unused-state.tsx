import React from "react";
class Counter extends React.Component {
  state = { count: 0 };
  render() {
    return <span>{this.state.count}</span>;
  }
}
