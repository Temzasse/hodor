// hodor-test expect-message: State field
import React from "react";
class Counter extends React.Component {
  state = { count: 0, debug: false };
  render() {
    return <span>{this.state.count}</span>;
  }
}
