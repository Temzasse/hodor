import React from "react";

class Counter extends React.Component {
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
}
